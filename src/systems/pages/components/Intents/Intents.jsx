import { useLocation, useNavigate } from "react-router-dom";
import { RouterDTO } from "../../../../utils/routers.dto";
import { Tabs } from "antd";
import CreateIntents from "./CreateIntent/CreateIntent";

export default function Intents() {
    const intents = [
        {
            key: RouterDTO.intents.createIntents,
            label: "Create Intents",
            children: <CreateIntents />,
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
                className=""
                activeKey={locations.pathname}
                defaultActiveKey={RouterDTO.intents.createIntents}
                items={intents}
                onChange={onChange}
            />
        </div>
    );
}
