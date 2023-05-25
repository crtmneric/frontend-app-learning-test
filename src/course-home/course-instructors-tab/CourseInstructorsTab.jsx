import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import LinkedInImg from "./assets/img/linked.png";
import InfoImg from "./assets/img/info.png";

function CourseInstructorsTab() {
    const { courseId } = useSelector(state => state.courseHome);

    const [allInstructors, setAllInstructors] = useState();

    useEffect(() => {
        getInstructors();
    }, [])

    const getInstructors = async () => {
        const apiKey = process.env.CMS_API_KEY;
        const CMS_URL = process.env.CMS_URL;
        let url = `${CMS_URL}/api/v1/cms/course/instructor/${courseId}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${apiKey}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            // Use the data from the response
            console.log(data.data);
            // Perform another job
            if (data.code === 200) {
                setAllInstructors(data.data)
            }
            else {
                console.log('Eğitmen yok')
            }

        } else {
            // Handle the error
            throw new Error('Request failed');
        }

    }



    return (
        <div class="instructors">
            {
                <div class="row">
                    {allInstructors && allInstructors.length > 0 && allInstructors.map(instructor => (
                        <div class="col-12 col-sm-12 col-md-3 col-lg-4">
                            <div class="instructor card" style={{ padding: "25px 35px", borderRadius: "16px", boxShadow: "0px 4px 16px rgb(209 219 228 / 40%)" }}>
                                <a style={{ color: "#4229E1", textAlign: "right" }} href={instructor.linkedin} target="_blank">
                                    <img src={LinkedInImg} alt="icon" style={{ width: "24px", alignSelf: "end" }} />
                                </a>
                                <img class="avatar" src={instructor.cover_image} alt={instructor.name} style={{ width: "130px", height: "130px", margin: "0 auto 20px auto", borderRadius: "50%", objectFit: "cover" }} />

                                <h5 class="name" style={{ marginBottom: "4px", fontSize: "13px", fontWeight: "bold", textAlign: "center" }}>{instructor.name}</h5>
                                <span class="title" style={{ paddingBottom: "16px", fontSize: "13px", textAlign: "center" }}>{instructor.title}</span>
                                <p class="text instructorBio"
                                    style={{ height: "200px", overflowY: "scroll", fontSize: "12px", textAlign: "center" }}>
                                    {instructor.bio}
                                </p>

                            </div>
                        </div>
                    ))}
                    {allInstructors && allInstructors.length < 1 &&
                        <div className='col-md-6 offset-md-3 text-center'>
                            <img src={InfoImg} alt="icon" />
                            <p className='no-instructor-text'>Gösterilecek Eğitmen Bilgisi Bulunamadı</p>
                        </div>

                    }
                </div>
            }

        </div>
    );
}

export default CourseInstructorsTab;

