import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    return (
        <>
            <div className="pattern3" style={
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    height: "100%"
                }}>
                <h1>Политика за поверителност</h1>

                <div>Тази политика за поверителност определя как ICHI BARBER използва всяка информация, която предоставяте, когато използвате нашия уебсайт.</div>

                <div>ICHI BARBER се ангажира да гарантира, че вашата поверителност е защитена.</div><div> Ако поискаме от вас да предоставите определена информация, чрез която можете да бъдете идентифицирани,</div>
                <div>когато използвате този уебсайт, можете да бъдете сигурни, че тя ще бъде използвана само в съответствие с тази декларация за поверителност.</div>
                <h1>Събираме следната информация когато запазите час</h1>
                <div>Име</div>
                <div>Телефонен номер</div>
                <div>Имейл адрес</div>
                <h1>Какво правим с информацията, която събираме</h1>
                <div>Изискваме тази информация, за да разберем вашите нужди и да ви предоставим по-добра услуга, и по-точно за следните причини:</div>
                <div>За да насрочим и потвърдим вашия час.</div>
                <div>За да се свържем с вас ако има промяна или грешка с часа.</div>
                <h1>Сигурност</h1>
                <div>Ние гарантираме, че вашата информация е защитена.</div> <div>За да предотвратим неоторизиран достъп или разкриване, сме въвели подходящи процедури за защита на информацията, която събираме онлайн.</div>
                <div></div>
                <h1>Как използваме бисквитки</h1>
                <div>Не използваме бисквитки на нашия уебсайт.</div>
                <h1>Контролиране на вашата лична информация</h1>
                <div>Ние няма да продаваме, разпространяваме или споделяме вашата лична информация на други хора/трети страни без вашето разрешение.</div>
                <div></div>
                <div></div>
                <div></div>
                <button className="finalizeBtn submit" style={{ backgroundColor: "edd8d8", marginTop: "1.5em" }}><Link to="/">Home Page</Link></button>
            </div>
        </>
    )
}

export default PrivacyPolicy;