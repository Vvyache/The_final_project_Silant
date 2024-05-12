import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { CustomContainer } from "../CustomComponents/CustomContainer";
import { DetailTable } from "./DetailTable/DetailTable";
import { DetailedData } from "../../Store/Slicers/DetailedSlicer";

const MachineDetailPage = () => {
    // Извлечение параметров маршрута
    const { id } = useParams();
    // Получение функции навигации
    const navigate = useNavigate();
    // Получение диспетчера для отправки действий Redux
    const dispatch = useDispatch();
    // Получение данных о деталях машины из хранилища
    const machine = useSelector((state) => state.detailed);

    // Эффект для загрузки детальных данных при монтировании компонента
    useEffect(() => {
        dispatch(DetailedData(id));
    }, [dispatch, id]);

    return (
        <CustomContainer>
            {/* Компонент для отображения детальной информации о машине */}
            <DetailTable machine={machine} />
            {/* Кнопка для возврата на предыдущую страницу */}
            <Button onClick={() => navigate('/')}>Назад</Button>
        </CustomContainer>
    );
};

export { MachineDetailPage };
