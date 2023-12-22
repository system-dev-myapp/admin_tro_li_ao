import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Button, Col, Divider, Input, Row, Select, Typography } from "antd";
import "react-markdown-editor-lite/lib/index.css";
import handleUploadImageMarkdown from "../../../../../helpers/handleUploadImageMarkdown";
import Swal from "sweetalert2";
import { active } from "../../../../../data/dataActiveIntent";
import {
    createIntentsService,
    getModelsService,
} from "../../../../../services/intentsService";

const { Title } = Typography;
const { Paragraph } = Typography;
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function CreateIntents() {
    const [title, setTitle] = useState("");
    const [activeIntent, setActiveIntent] = useState(true);
    const [models, setModel] = useState([]);
    const [ValueModel, setValueModel] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [desc, setDesc] = useState({
        html: "",
        text: "",
    });

    function handleEditorChange({ html, text }) {
        setDesc({ html: html, text: text });
    }

    const handleChangeActive = (value) => {
        setActiveIntent(value);
    };

    const handleChangeValueModel = (value) => {
        setValueModel(value);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getModelsService();
                if (res.length > 0) {
                    setModel(res);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const handleValidate = () => {
        let isValid = true;

        const arrValid = [title, desc.text, ValueModel];
        for (let i = 0; i < arrValid.length; i++) {
            if (!arrValid[i]) {
                isValid = false;
                Swal.fire({
                    icon: "warning",
                    title: "Bạn vui lòng không để trống các trường !",
                });
                break;
            }
        }

        return isValid;
    };

    const handleCreateIntent = async () => {
        setIsLoading(true);
        const check = handleValidate();
        if (!check) {
            setIsLoading(false);
            return;
        }

        let dataBuider = {
            title: title,
            content_mark_down: desc.text,
            content_html: desc.html,
            is_active: activeIntent,
            model: ValueModel,
        };

        try {
            const res = await createIntentsService(dataBuider);
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: `Intent ${title} đã được tạo thành công`,
                });
                setTitle("");
                setActiveIntent(true);
                setModel([]);
                setDesc({
                    html: "",
                    text: "",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "warning",
                title: "Đã xảy ra lỗi vui lòng thử lại sau !",
            });
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <div className="mb-[30px]">
                <Title level={4}>
                    Tại Đây Bạn Có Thể Tạo Ra các Intents Mà Bạn Mong Muốn
                </Title>
            </div>
            <Divider />

            <div className="">
                <Title type="warning" level={5}>
                    Chú Thích Và Quy Tắc
                </Title>
                <Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    className="py-1 text-justify font-[600] mt-4"
                >
                    Các intents bạn tạo tại đây sẽ là nội dung câu trả lời (
                    <span className="text-[blue]">Nội dung intent</span>) khi
                    người dùng đặt câu hỏi liên quan đến các chủ đề có trong{" "}
                    <span className="text-[blue]">model</span>
                </Paragraph>
            </div>
            <Divider />
            <Row>
                <Col span={12} className="pr-[20px]  pb-[20px]">
                    <div className="">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900"
                            htmlFor="title-intents"
                        >
                            Nhập tiêu đề của intent
                        </label>
                        <Input
                            id="title-intents"
                            className="mt-[10px]"
                            size="large"
                            placeholder="Tiêu đề (title)"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </Col>

                <Col span={5} className="pr-[20px]">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="active-intents"
                    >
                        Chọn trạng thái intent
                    </label>
                    <Select
                        defaultValue={activeIntent}
                        id="active-intents"
                        options={active}
                        className="w-[100%] mt-[10px] "
                        size="large"
                        value={activeIntent}
                        onChange={handleChangeActive}
                    />
                </Col>
                <Col span={7}>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="modal-intents"
                    >
                        Chọn model
                    </label>
                    <Select
                        id="modal-intents"
                        options={models.map((item) => {
                            return {
                                value: item._id,
                                label: (
                                    <div>
                                        <span className="font-semibold ">
                                            {item.title}
                                        </span>
                                        <span> ({item.name_unix_model})</span>
                                    </div>
                                ),
                            };
                        })}
                        className="w-[100%] mt-[10px]"
                        size="large"
                        onChange={handleChangeValueModel}
                    />
                </Col>
            </Row>

            <div className="mt-10 w-[100%]">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Nhập nội dung Intent
                </label>
                <MdEditor
                    className="w-[100%]"
                    onImageUpload={handleUploadImageMarkdown}
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    value={desc.text}
                    onChange={handleEditorChange}
                />
            </div>

            <div className="w-full flex flex-row-reverse mt-6">
                <div className="w-[15%] py-[10px]">
                    <Button
                        onClick={handleCreateIntent}
                        loading={isLoading}
                        type="primary"
                        // className="block float-right"
                        className="w-[100%]"
                    >
                        Tạo Intent
                    </Button>
                </div>
            </div>
        </div>
    );
}
