import { Tabs } from "antd";
import { RouterDTO } from "../../../../utils/routers.dto";
import { useLocation, useNavigate } from "react-router-dom";
import CreateYear from "./CreateYear/CreateYear";
import PointYear from "./PointYear/PointYear";

export default function Year() {
    const intentsPoint = [
        {
            key: RouterDTO.Year.createManageYear,
            label: "Tạo năm quản lí",
            children: <CreateYear />,
        },
        {
            key: RouterDTO.Year.createPointYear,
            label: "Điểm đầu vào theo năm",
            children: <PointYear />,
        },
    ];

    const navigate = useNavigate();
    const locations = useLocation();
    const onChange = (key) => {
        navigate(`${key}`);
    };

    return (
        <div>
            <Tabs
                activeKey={locations.pathname}
                defaultActiveKey={RouterDTO.Year.createManageYear}
                items={intentsPoint}
                onChange={onChange}
            />
        </div>
    );
}
