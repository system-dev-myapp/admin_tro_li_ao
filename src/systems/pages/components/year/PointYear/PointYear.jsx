import { useEffect, useRef, useState } from "react";
import { GetAllYearService } from "../../../../../services/yearService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import handleUploadImageMarkdown from "../../../../../helpers/handleUploadImageMarkdown";
import handleValidateImage, {
    handleValidateFile,
} from "../../../../../helpers/validateImageFile";
import Swal from "sweetalert2";
import { Button, Col, Divider, Input, Row, Select, Typography } from "antd";
import SlickImages from "./SlickImages/SlickImages";
import FileViewer from "react-file-viewer";
import { CreatePointService } from "../../../../../services/pointService";

const { Title } = Typography;
const { Paragraph } = Typography;
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function PointYear() {
    const [isLoading, setIsLoading] = useState(false);
    const [optionsYear, setOptionsYear] = useState([]);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [file, setFile] = useState(null);
    const [listImage, setListImage] = useState([]);
    const [isChooseFile, setIsChooseFile] = useState(false);
    const [desc, setDesc] = useState({
        html: "",
        text: "",
    });

    const refFile = useRef(null);
    const refListImage = useRef(null);

    function handleEditorChange({ html, text }) {
        setDesc({ html: html, text: text });
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await GetAllYearService();

                setOptionsYear(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const handleChangeYear = (year) => {
        setYear(year);
    };

    const handleChooseListImagelFile = async () => {
        const input = refListImage.current;
        if (input) {
            input.click();
        }
    };

    console.log(listImage);
    const handleChangeListFileImage = (e) => {
        const files = e.target.files;
        let ListImageFiles = [];
        if (files && files.length) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 1024 * 1024 * 10) {
                    Swal.fire({
                        icon: "warning",
                        title: "Các ảnh phải có dung lượng nhỏ hơn 10Mb !",
                    });
                    setListImage([]);
                    refListImage.current.value = null;
                    return;
                }
                if (!handleValidateImage(files[i])) {
                    Swal.fire({
                        icon: "warning",
                        title: "Bạn vui lòng đúng định dạng ảnh (.gif , .jpe , .jpg , .tiff , .png , .webp hoặc .bmp)",
                    });
                    setListImage([]);
                    refListImage.current.value = null;
                    return;
                }
                ListImageFiles.push(files[i]);
            }
            setListImage(ListImageFiles);
            setIsChooseFile(true);
        }
    };

    const handleChageFile = (e) => {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024 * 10) {
            Swal.fire({
                icon: "warning",
                title: "Bạn vui lòng chọn file có dung lượng nhở hơn 10Mb !",
            });
            refFile.current.value = null;
            return;
        }
        if (!handleValidateFile(file)) {
            Swal.fire({
                icon: "warning",
                title: "Bạn vui lòng chọn đúng định dạng file ( .doc , .docx , .pdf , .xlsx)",
            });
            refFile.current.value = null;
            return;
        }
        setFile(file);
        setIsChooseFile(true);
    };

    const handleValidate = () => {
        let isValid = true;
        const arrValid = [title, year, desc.text, isChooseFile, file];
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
            year: year,
            image: listImage,
            file: [file],
            content_mark_down: desc.text,
            content_html: desc.html,
        };
        try {
            const res = await CreatePointService(dataBuider);
            if (res) {
                Swal.fire({
                    icon: "success",
                    title: `Bạn đã tạo thành công dữ liệu điểm đầu vào năm ${year}`,
                });
                setFile(null);
                setListImage([]);
                setTitle("");
                setYear("");
                setDesc({
                    html: "",
                    text: "",
                });
                refListImage.current.value = null;
                refFile.current.value = null;
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
            <div className="mb-[30px]">
                <Title level={4}>Tạo điểm theo năm</Title>
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
                    <label className="text-[blue] hover:cursor-pointer">
                        Nội dung intent
                    </label>{" "}
                    ,{" "}
                    <label
                        className="text-[blue] hover:cursor-pointer"
                        htmlFor="image"
                    >
                        ảnh
                    </label>{" "}
                    ,{" "}
                    <label
                        className="text-[blue] hover:cursor-pointer"
                        htmlFor="file"
                    >
                        file đính kèm
                    </label>
                    ) khi người dùng đặt câu hỏi liên quan đến điểm đầu vào theo
                    từng năm bạn tạo{" "}
                    <label
                        className="text-[blue] hover:cursor-pointer"
                        htmlFor="year"
                    >
                        chọn năm
                    </label>
                </Paragraph>
            </div>
            <Divider />
            <Row className="mt-[30px]">
                <Col span={12} className="pr-[20px]">
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

                    <label
                        className="block text-sm font-medium text-gray-900 mb-[10px] mt-[30px]"
                        htmlFor="file"
                    >
                        Chọn file đính kèm
                    </label>

                    <input
                        id="file"
                        ref={refFile}
                        type="file"
                        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600   file:bg-gray-50 file:border-0 file:me-4  file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                        onChange={handleChageFile}
                        hidden
                    />
                    <div className="h-[200px]">
                        {file && (
                            <FileViewer
                                fileType={
                                    file.name.split(".")[
                                        file.name.split(".").length - 1
                                    ]
                                }
                                filePath={URL.createObjectURL(file)}
                                errorComponent={() => (
                                    <div>Error loading file</div>
                                )}
                            />
                        )}
                    </div>
                </Col>

                <Col span={12} className="pl-[20px]">
                    <label
                        className="block  text-sm font-medium text-gray-900 mb-[10px]"
                        htmlFor="year"
                    >
                        Chọn Năm Cần Tạo
                    </label>
                    <Select
                        id="year"
                        options={optionsYear.map((item) => {
                            return {
                                label: item.title,
                                value: item.code_year,
                            };
                        })}
                        className="w-[100%] "
                        size="large"
                        value={year}
                        onChange={handleChangeYear}
                        placeholder="Select a person"
                    />
                    <label
                        className="block text-sm font-medium text-gray-900 mb-[10px] mt-[5%]"
                        htmlFor="image"
                    >
                        Chọn ảnh
                    </label>

                    {/*  */}
                    <div
                        className={`relative ${
                            listImage.length > 0 ? null : "border-[1px]"
                        } rounded h-[250px] w-[100%]`}
                    >
                        <input
                            id="image"
                            onChange={handleChangeListFileImage}
                            ref={refListImage}
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            multiple
                            hidden
                        />

                        <SlickImages listImage={listImage} />
                        <button
                            onClick={handleChooseListImagelFile}
                            className="z-[2] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:text-[#ee4d2d]"
                        >
                            <span className="text-[30px]">
                                <i className="bi bi-upload"></i>
                            </span>
                        </button>
                    </div>
                </Col>
            </Row>
            <div className="mt-[30px]">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Nhập nội dung
                </label>
                <MdEditor
                    id="desc"
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
