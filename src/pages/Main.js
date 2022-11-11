import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Main = () => {
  const [inputFile, setInputFile] = useState(null);
  const [email, setEmail] = useState("");

  const uploadUrl = process.env.REACT_APP_UPLOAD_API;

  const uploadFile = () => {
    const requestUrl = `${uploadUrl}/upload`;

    let formData = new FormData();

    formData.append("uploadFile", inputFile[0]);
    formData.append("email", email);
    formData.append("isSendMail", 1);

    axios
      .post(requestUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res : ", res);
        alert("Upload Success");

        setInputFile(null);
      })
      .catch((e) => console.log("Upload Exception : ", e));
  };

  return (
    <Wrapper>
      <Title>Upload Audio File</Title>
      <TextField>Email *</TextField>
      <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField>Attach File</TextField>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        accept="audio/*"
        onChange={(e) =>
          e.target.files ? setInputFile(e.target.files) : setInputFile(null)
        }
      />
      <InputLabel htmlFor="file">
        {inputFile && inputFile[0] ? inputFile[0].name : "Choose File"}
      </InputLabel>
      <SubmitButton
        className={inputFile && "" !== email && "active"}
        onClick={() => inputFile && "" !== email && uploadFile()}
      >
        Upload
      </SubmitButton>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  z-index: 5;
  width: 350px;
  height: 420px;
  padding: 20px 22px 24px 31px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-top: 25px;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000;
`;

const TextField = styled.div`
  width: 100%;
  height: 30px;
`;

const InputField = styled.input`
  padding: 0;
  margin-top: 5px;
  margin-bottom: 20px;
  display: block;
  border: 0;
  width: 100%;
  height: 30px;
  border: 2px solid #e8e8ec;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #000000;
  outline: 0;
  box-sizing: border-box;
  &::placeholder {
    color: #8b8e95;
  }
`;

const InputLabel = styled.label`
  padding: 0;
  margin-top: 5px;
  display: block;
  border: 0;
  width: 100%;
  height: 30px;
  border: 2px solid #e8e8ec;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #8b8e95;
  padding-left: 5px;
  box-sizing: border-box;
  outline: 0;

  &::placeholder {
    color: #8b8e95;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(72, 122, 180, 0.2);
  margin-top: 80px;
  cursor: pointer;

  &.active {
    background-color: rgba(72, 122, 180, 1);
  }
`;
