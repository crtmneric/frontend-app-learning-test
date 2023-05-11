import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';

function CourseInstructorsTab() {
    const { courseId } = useSelector(state => state.courseHome);
    const [loading, setLoading] = useState(true);

    const [allInstructors, setAllInstructors] = useState();

    useEffect(() => {
        getInstructors();
    }, [])

    const getInstructors = async () => {
        setLoading(true);
        const apiKey = process.env.CMS_API_KEY;
        const CMS_URL = process.env.CMS_URL;
        let url = `${CMS_URL}/api/v1/cms/course/instructor/${courseId}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${apiKey}`
            },
        });

        console.log("response", response)

        if (response.code === 200) {
            setAllInstructors(response.data)
        }

        setLoading(false);
    }

    return (
        <div class="instructors">
            {loading ?
                <div class="row">
                    {allInstructors && allInstructors.length > 0 && allInstructors.map(instructor => (
                        <div class="col-12 col-sm-12 col-md-3 col-lg-4">
                            <div class="instructor card" style={{ padding: "25px 35px", borderRadius: "16px", boxShadow: "0px 4px 16px rgb(209 219 228 / 40%)" }}>
                                <a style={{ color: "#4229E1" }} href={instructor.linkedin} target="_blank">
                                    <img src="./assets/img/linked.png" alt="icon" style={{ width: "24px", alignSelf: "end" }} />
                                </a>
                                <img class="avatar" src={instructor.cover_image} alt={instructor.name} style={{ borderRadius: "50%", paddingBottom: "24px" }} />

                                <h5 class="name" style={{ marginBottom: "4px", fontSize: "13px", fontWeight: "bold", textAlign: "center" }}>{instructor.name}</h5>
                                <span class="title" style={{ paddingBottom: "16px", fontSize: "13px", textAlign: "center" }}>{instructor.title}</span>
                                <p class="text instructorBio">{instructor.bio}</p>

                            </div>
                        </div>
                    ))}
                    {allInstructors && allInstructors.length < 1 &&
                        <span>Gösterilecek eğitmen bulunamadı.</span>
                    }
                </div>
                :
                <span>Yükleniyor</span>
            }

        </div>
    );
}

export default CourseInstructorsTab;

