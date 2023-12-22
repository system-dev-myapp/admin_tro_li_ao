import { Button, Col, DatePicker, Input, Row, Typography } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { CreateYearService } from "../../../../../services/yearService";

const { Title } = Typography;

export default function CreateYear() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");

    const handleChangeYear = (date, dateString) => {
        setYear(dateString);
    };

    const handleValidate = () => {
        let isValid = true;
        const arrValid = [title, year];
        for (let i = 0; i < arrValid.length; i++) {
            if (!arrValid[i]) {
                isValid = false;
                Swal.fire({
                    icon: "warning",
                    title: "Bạn vui lòng nhập đủ thông tin !",
                });
                break;
            }
        }
        return isValid;
    };

    const handleCreateYear = async () => {
        setIsLoading(true);
        const check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }
        let dataBuider = {
            title: title,
            code_year: year,
        };

        try {
            const res = await CreateYearService(dataBuider);
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: "bạn đã tạo năm quản lí Thành công",
                });
                setTitle("");
                setYear("");
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Đã xảy ra lỗi vui lòng thử lại sau !",
            });
            console.log(err);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <Title level={4}>Tạo năm quản lí</Title>
            <Row className="mt-[30px]">
                <Col span={15} className="pr-[20px]">
                    <label
                        className="block text-sm font-medium text-gray-900 mb-[10px]"
                        htmlFor="title-intents"
                    >
                        Nhập tiêu đề
                    </label>
                    <Input
                        id="title-intents"
                        size="large"
                        placeholder="Tiêu đề (title)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col span={9} className="pl-[20px]">
                    <label className="block  text-sm font-medium text-gray-900 mb-[10px]">
                        Chọn Năm Cần Tạo
                    </label>
                    <DatePicker
                        onChange={handleChangeYear}
                        picker="year"
                        size="large"
                        className="w-[100%]"
                    />
                </Col>
            </Row>

            <div className="w-full flex flex-row-reverse mt-6">
                <div className="w-[15%] py-[10px]">
                    <Button
                        onClick={handleCreateYear}
                        loading={isLoading}
                        type="primary"
                        // className="block float-right"
                        className="w-[100%]"
                    >
                        Tạo Năm Quản lí
                    </Button>
                </div>
            </div>
        </div>
    );
}
