import { Button, Typography } from "antd";
import { logo } from "../../../../data/dataLogoUneti";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Home() {
    return (
        <div>
            <div className="w-[20%] ml-[50%] translate-x-[-50%] object-cover">
                <img src={logo} className="w-[100%]" />
            </div>
            <div className="">
                <Title level={2} className="text-center mt-[20px] ">
                    UNETI
                </Title>
                <Title level={4} className="text-center">
                    Đại học Kinh Tế - Kỹ Thuật Công Nghiệp
                </Title>
                <Title className="text-center" level={5}>
                    Quản lí trợ lí ảo{" "}
                </Title>
                <Title className="text-center" level={5}>
                    Trợ lí ảo hỗ trợ người dùng giải đáp các thắc mắc liên quán
                    đến tuyển sinh của trường đại học Kinh Tế Kỹ - Thuật Công
                    Nghiệp
                </Title>
            </div>
            <div className="text-center">
                <Title level={4}>
                    Tại đây bạn có thể quản lí và khởi tạo các câu trả lời của
                    trợ lí ảo
                </Title>
            </div>
            <div className="w-[20%] ml-[50%] translate-x-[-50%] mt-[30px] pb-[50px]">
                <Link to="/intents/create-intents" className="w-[100%]">
                    <Button type="primary" className="w-[100%]">
                        Bắt đầu tạo các câu trả lời
                    </Button>
                </Link>
            </div>
        </div>
    );
}
