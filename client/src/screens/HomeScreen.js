import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const HomeScreen = () => {
    window.scrollTo(0, 0);
    return (
        <>
            <Header />
            <div className='pattern'>
                <img src="./../images/opening.png" id="opening" />
                <Link to="/cart">
                    <div className="reservebtn">НАПРАВЕТЕ РЕЗЕРВАЦИЯ</div>
                </Link>
            </div>

            <div id="table">
                <div className="pd" id="tableabout">
                    <div className="abouttablemain">ЗА МЕН</div>
                    <div className="textseparation"></div>
                    <h1 style={{ fontWeight: "100" }}>Първата бръснарница във Враца!</h1>
                    <h5 style={{ fontWeight: "100" }}>Бръснарницата на Ичи е малка, но привлекателна и модерна. Оборудвана е с нови уреди и приятна
                        атмосфера.</h5>
                </div>
                <div id="timetable">
                    <img src="images/sci.png" id="sci" />
                    <div className="timetablemain">РАБОТНО ВРЕМЕ</div>
                    <div className="textseparation2"> .</div>
                    <h5>Понеделник - Петък: 9:30 - 18:30</h5>
                    <h5>Събота: 9:30 - 13:30</h5>
                    <div className="timetablemain">ЛОКАЦИЯ</div>
                    <div className="textseparation2"> .</div>
                    <h5>бул. „Христо Ботев“ 76, Враца</h5>
                    <h5>Тел.: 0876850324</h5>
                </div>
            </div>


            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1454.044475055548!2d23.54684636248395!3d43.20762362622872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ab18e7106b99e5%3A0x6bc19f0f8ef18816!2z0LHRg9C7LiDigJ7QpdGA0LjRgdGC0L4g0JHQvtGC0LXQsuKAnCA3NiwgMzAwMCDQktGA0LDRhtCwINCm0LXQvdGC0YrRgCwg0JLRgNCw0YbQsA!5e0!3m2!1sbg!2sbg!4v1660254929298!5m2!1sbg!2sbg"
                width="100%" height="500" style={{ border: "0", position: "absolute" }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>

            <div className='pattern2'></div>

            <div id="services">
                <div className="servicesh1">УСЛУГИ</div>
                <img src="images/barbericon.png" id="barb" />
                <div className="textseparation"></div>
                <div className="servicesgrid">
                    <h3>Модерни подстрижки</h3>
                    <h3>Кралско бръснене</h3>
                    <h3>Боядисване</h3>
                    <h3>Оформяне на брада</h3>
                </div>
            </div>
            <div className="pattern3">
                <div className="reviewsh1">ОТЗИВИ</div>
                <div className="textseparation" style={{ position: "absolute", left: "2.3em", top: "4.5em" }}></div>
                <div className="reviewsgrid">
                    <div className="reviewsdiv">
                        <span className="star">★ ★ ★ ★ ★</span>
                        <div>"Приятна атмосфера! Професионално обслужване с безкомпромисно качество! Многократно вече съм
                            ползвал услугите за оформяне на брада и прическа и съм супер доволен. Ще продължавам да
                            посещавам тази бръснарница и за в бъдеще! Успех!"</div>
                        <div className="reviewsh2">google review</div>
                    </div>
                    <div className="reviewsdiv">
                        <span className="star">★ ★ ★ ★ ★</span>
                        <div>"Няма по-добър в града! Прецизен и винаги с внимание към детайлите."</div>
                        <div className="reviewsh2">google review</div>
                    </div>
                    <div className="reviewsdiv">
                        <span className="star">★ ★ ★ ★ ★</span>
                        <div>"Най-добрият в града...х"</div>
                        <div className="reviewsh2">google review</div>
                    </div>
                    <div className="reviewsdiv">
                        <span className="star">★ ★ ★ ★ ★</span>
                        <div>"Изключително добър. Професионалист. Приятна атмосфера."</div>
                        <div className="reviewsh2">google review</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomeScreen;