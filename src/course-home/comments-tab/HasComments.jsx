import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import { Toast, ToastContainer } from 'react-bootstrap';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import NoComments from './NoComments';

function HasComments() {
    const { courseId } = useSelector(state => state.courseHome);

    const order_types = [
        { 'id': 1, 'key': '-rate', 'text': 'Puana Göre Azalan' },
        { 'id': 2, 'key': 'rate', 'text': 'Puana Göre Artan' },
        { 'id': 3, 'key': '-created_at', 'text': 'Yeniden Eskiye' },
        { 'id': 4, 'key': 'created_at', 'text': 'Eskiden Yeniye' }
    ]

    const [comments, setComments] = useState([]);

    const [rate, setRate] = useState(0);
    const [avarage, setAvarage] = useState(0);
    const [avarageIcon, setAvarageIcon] = useState(0);
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const [progress4, setProgress4] = useState(0);
    const [progress5, setProgress5] = useState(0);

    const [comment, setComment] = useState("");

    const [showToaster, setShowToaster] = useState(false);
    const [toasterStatus, setToasterStatus] = useState();

    useEffect(() => {
        addCommentStarColored();
        getComments();
    }, [])

    const handleRateClick = (event) => {
        const rating = parseInt(event.target.getAttribute("data-rating"));
        setRate(rating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSaveClick = () => {
        saveComment(rate, comment);
    };

    const saveComment = (rate, comment) => {
        const formData = new FormData();
        formData.append('rate', rate);
        formData.append('comment', comment);
        addComment(formData)
    };

    const getComments = async () => {
        let url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/comments/data`;
        // url = appendBrowserTimezoneToUrl(url);
        const { data } = await getAuthenticatedHttpClient().get(url);

        setComments(data['comments'])
        setAvarage(data["bar"]["average"])
        setAvarageIcon(data["bar"]["avg_icon"])
        setProgress1(data["bar"]["1"])
        setProgress2(data["bar"]["2"])
        setProgress3(data["bar"]["3"])
        setProgress4(data["bar"]["4"])
        setProgress5(data["bar"]["5"])


        console.log("data", data)
    }

    const addComment = async (dataJson) => {
        let url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/comments/addComment`;
        // url = appendBrowserTimezoneToUrl(url);

        const { data } = await getAuthenticatedHttpClient().post(url, dataJson, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (data.code === 200) {
            setShowToaster(true);
            setToasterStatus("success");
        } else {
            setShowToaster(true);
            setToasterStatus("danger");
        }

        getComments();
        console.log("data", data)
    }

    const getStarRows = (starNumber) => {
        let starRows = [];

        for (let starIndex = 1; starIndex < 6; starIndex++) {
            if (starNumber >= starIndex) {
                starRows.push(<i className="st-icon-star-checked" aria-hidden="true" />);
            } else {
                starRows.push(<i className="st-icon-star" aria-hidden="true" />);
            }
        }
        return starRows;
    }

    const getAverageStarRows = (starNumber) => {
        let starRows = [];

        for (let starIndex = 1; starIndex < 6; starIndex++) {
            if (starNumber >= starIndex) {
                starRows.push(<i className="st-icon-star-checked" aria-hidden="true" />);
            } else {
                starRows.push(<i className="st-icon-star" aria-hidden="true" />);
            }
        }
        return starRows;
    }

    const addCommentStarColored = () => {
        let stars = document.querySelectorAll(".reviewStars i");

        stars.forEach(item => {
            item.addEventListener('click', function () {
                let rating = this.getAttribute("data-rating");
                let input = document.getElementsByTagName("input");
                input.value = rating;
                return SetRatingStar(rating, stars);
            });
        });
    }

    function SetRatingStar(rating, stars) {
        let len = stars.length;
        console.log(rating);

        for (let i = 0; i < len; i++) {
            if (i < rating) {
                stars[i].classList.replace('smile-icon-star', 'smile-icon-star-checked');
            } else {
                stars[i].classList.replace('smile-icon-star-checked', 'smile-icon-star');
            }
        }

    };

    function handleDropdownChange(selectedDropdownValue) {

        let tempSort = [];
        let sortableData = comments;

        if (selectedDropdownValue === "created_at") {
            tempSort = [...sortableData].sort((a, b) => {
                return new Date(a.created_at) > new Date(a.created_at) ? -1 : 1;
            })
        }
        if (selectedDropdownValue === "-created_at") {
            tempSort = [...sortableData].sort((a, b) => {
                return new Date(a.created_at) > new Date(a.created_at) ? 1 : -1;
            })
        }
        if (selectedDropdownValue === "rate") {
            tempSort = [...sortableData].sort((a, b) => {
                return a.rate > b.rate ? 1 : -1;
            })
        }
        if (selectedDropdownValue === "-rate") {
            tempSort = [...sortableData].sort((a, b) => {
                return a.rate > b.rate ? -1 : 1;
            })
        }

        setComments(tempSort);
    }

    return (
        <>
            {comments.length > 0 ?
                <div className="comments_header">
                    <div className="d-flex pg-wrapper" style={{ width: "100%" }}>
                        <div className="col-2 total-number-wrapper">
                            <span className="display-4 font-weight-bolder" style={{ fontSize: "64px", fontWeight: "bold" }}>{avarage}</span>
                            <div className="text-right" style={{ display: "flex", gap: "3px", paddingLeft: "14px", paddingTop: "10px" }}>
                                {getAverageStarRows(avarageIcon)}
                            </div>
                        </div>

                        <div className="flex-grow-1 col-10">
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div className="progress-bar" role="progressbar"
                                            style={{ width: `${progress5}%` }}
                                            aria-valuenow={progress5}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 text-right">
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div className="progress-bar" role="progressbar"
                                            style={{ width: `${progress4}%` }}
                                            aria-valuenow={progress4}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 text-right">
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div className="progress-bar" role="progressbar"
                                            style={{ width: `${progress3}%` }}
                                            aria-valuenow={progress3}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 text-right">
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div className="progress-bar" role="progressbar"
                                            style={{ width: `${progress2}%` }}
                                            aria-valuenow={progress2}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 text-right">
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="progress" style={{ height: "8px" }}>
                                        <div className="progress-bar" role="progressbar"
                                            style={{ width: `${progress1}%` }}
                                            aria-valuenow={progress1}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-2 text-right">
                                    <i className="st-icon-star-checked" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                    <i className="st-icon-star" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="add_comment">
                        <div className="add-comment-wrapper">
                            <b className="add-comment-title">Değerlendir</b>
                            <input id="inputField" type="hidden" name="rate" required />
                            <div className="reviewStars stars py-4">
                                <i
                                    id="add-comment-star-1"
                                    data-rating="1"
                                    className={`smile-icon-star${rate >= 1 ? "-checked" : ""} l-star`}
                                    aria-hidden="true"
                                    onClick={handleRateClick}
                                ></i>
                                <i
                                    id="add-comment-star-2"
                                    data-rating="2"
                                    className={`smile-icon-star${rate >= 2 ? "-checked" : ""} l-star`}
                                    aria-hidden="true"
                                    onClick={handleRateClick}
                                ></i>
                                <i
                                    id="add-comment-star-3"
                                    data-rating="3"
                                    className={`smile-icon-star${rate >= 3 ? "-checked" : ""} l-star`}
                                    aria-hidden="true"
                                    onClick={handleRateClick}
                                ></i>
                                <i
                                    id="add-comment-star-4"
                                    data-rating="4"
                                    className={`smile-icon-star${rate >= 4 ? "-checked" : ""} l-star`}
                                    aria-hidden="true"
                                    onClick={handleRateClick}
                                ></i>
                                <i
                                    id="add-comment-star-5"
                                    data-rating="5"
                                    className={`smile-icon-star${rate >= 5 ? "-checked" : ""} l-star`}
                                    aria-hidden="true"
                                    onClick={handleRateClick}
                                ></i>
                            </div>
                            <div className="comment_box">
                                <textarea
                                    name="comment"
                                    rows="6"
                                    placeholder="Yorumun (İsteğe Bağlı)"
                                    value={comment}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>
                            <div className="comment_footer" style={{ flexDirection: "column", gap: "10px" }}>
                                <button className="comment_button" onClick={handleSaveClick}>
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='title-with-dropdown'>
                        <h5>Tüm Yorumlar</h5>
                        <Dropdown onSelect={handleDropdownChange}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="comment_button-order dropdown-toggle">
                                Sırala <i className="icon-chevron-down"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu">
                                {order_types.map(order => (
                                    <Dropdown.Item key={order.id} eventKey={order.key}>{order.text}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className='comment-wrapper'>
                        {comments && comments.map(comment => (
                            <div className="comment" key={comment.id}>
                                <div className="comment_content" style={{ width: "100%" }}>
                                    <div className="star-and-name-row" style={{ justifyContent: "space-between" }}>
                                        <div className="stars">
                                            {getStarRows(comment.rate)}
                                        </div>
                                        <h6 className='commentOwner'>{comment.user.name}</h6>

                                    </div>
                                    <div className="message">
                                        {comment.comment}
                                    </div>
                                    <div className="comment-bottom">
                                        <div className="date comment-date">{comment.created_at}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <NoComments />
            }
            <ToastContainer className={'p-3'} position={"top-end"}>
                <Toast show={showToaster} style={{ borderRadius: "20px" }}>
                    <Toast.Body style={{ display: "flex", gap: "20px", padding: "15px 30px", background: toasterStatus === "danger" ? "#FCD8DB" : "#F2F9D4", borderRadius: "20px" }}>
                        <img src={toasterStatus === "danger" ? "./assets/img/ericon.png" : "./assets/img/sucicon.png"} width={15} className="rounded me-2" alt="" />
                        <span style={{ fontSize: "13px", fontFamily: "Satoshi" }}>
                            {toasterStatus === "danger" ?
                                "Zaten bir yorumunuz mevcut!" :
                                "Yorumunuz başarılı şekilde kaydedildi."}
                        </span>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>

    );
}

export default HasComments;

