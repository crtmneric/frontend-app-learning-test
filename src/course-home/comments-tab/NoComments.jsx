import { useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import NoCommentsImg from "./assets/img/no-comment.png";
import { useSelector } from 'react-redux';
import HasComments from './HasComments';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

function NoComments() {
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState(0);

    const { courseId } = useSelector(state => state.courseHome);
    const saveComment = (rate, comment) => {
        const formData = new FormData();
        formData.append('rate', rate);
        formData.append('comment', comment);
        addComment(formData)
    };

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

    const addComment = async (dataJson) => {
        let url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/comments/addComment`;
        // url = appendBrowserTimezoneToUrl(url);

        const { data } = await getAuthenticatedHttpClient().post(url, dataJson, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        window.location.reload()
       
    }
    return (
        <div>
            <div class="no-comment-wrapper">
                <img class="no-comment-img" src={NoCommentsImg} alt="My Open edX Home" />
                <strong>Bu programa ait bir yorum bulunmuyor.</strong>
            </div>
            <div class="starts-rating-wrapper" style={{ paddingTop: "20px" }}>
                <div class="reviewStars stars" style={{ gap: "8px", display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <i data-rating="1" class="smile-icon-star" aria-hidden="true" onClick={handleRateClick}></i>
                    <i data-rating="2" class="smile-icon-star" aria-hidden="true" onClick={handleRateClick}></i>
                    <i data-rating="3" class="smile-icon-star" aria-hidden="true" onClick={handleRateClick}></i>
                    <i data-rating="4" class="smile-icon-star" aria-hidden="true" onClick={handleRateClick}></i>
                    <i data-rating="5" class="smile-icon-star" aria-hidden="true" onClick={handleRateClick}></i>
                </div>
            </div>
            <div class="comment_wrapper">
                <div class="add_comment" style={{ paddingLeft: "20px !important" }}>
                    <input type="hidden" name="rate" required />
                    <div class="comment_box" style={{ paddingBottom: "0px", display: "inline-block", width: "450px" }}>
                        <div class="header">
                            <b>Yorum yap (İsteğe bağlı)</b>
                        </div>
                        <textarea name="comment" rows="6" placeholder="Yorumun" value={comment} onChange={handleCommentChange}></textarea>
                    </div>
                    <div class="comment_footer">
                        <button class="comment_button" type="submit"  onClick={handleSaveClick}>Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoComments;

