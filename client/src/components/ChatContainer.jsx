import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Formik, useFormik } from "formik";
import useFetch from "../hooks/fetchhooks";
import { addMessage } from "../helper/helper";
import avatar from "../assets/avatar.jpg";
import "./ChatContainer.scss";
import { Avatar } from "@mui/material";
import axios, { all } from "axios";
import "../styles/ChatContainer.css";
const addMessageUrl = "http://localhost:8080/api/addMessage";
const getMessageUrl = "http://localhost:8080/api/getMessage";
export const Chat_container = (props) => {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const [chatmessage, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (chatmessage.length > 0) {
      setMessage("");
    }
    await axios.post(addMessageUrl, {
      from: apiData?._id,
      to: props?.data._id,
      message: chatmessage,
    });
  };

  useEffect(() => {
    async function check() {
      const response = await axios.post(getMessageUrl, {
        from: apiData?._id,
        to: props?.data._id,
      });
      setAllMessages(response.data);
      // console.log(allMessages);
      // console.log("from"+apiData?.username);
      // console.log("to"+props?.data.username);
    }
    check();
  }, [apiData, props?.data]);
  const css = {};

  function stringToColor1(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  return (
    <>
      <div
        className="text-3xl mt-16  h-[calc(100%-128px)] messages"
        style={{ backgroundColor: "#E4DCCF" }}
      >
        <ul>
          {allMessages.map((dataObj, index) => {
            return (
              <div key={index}>
                {dataObj.fromSelf === true ? (
                  <li key={index} className="replies">
                    {/* <img src={apiData?.profile || avatar} alt="image"></img> */}
                    <div>
                      <Avatar
                        sx={
                          apiData?.username !== undefined
                            ? {
                                bgcolor: stringToColor1(apiData?.profile),
                                width: 30,
                                height: 30,
                              }
                            : {
                                bgcolor: stringToColor1("G"),
                                width: 30,
                                height: 30,
                              }
                        }
                        src={apiData?.profile}
                        size="sm"
                      >
                        {apiData?.username !== undefined
                          ? apiData?.username.split(" ").length > 1
                            ? apiData?.username.split(" ")[0][0].toUpperCase() +
                              apiData?.username.split(" ")[1][0].toUpperCase()
                            : apiData?.username.split(" ")[0][0].toUpperCase()
                          : "G"}
                      </Avatar>
                    </div>
                    <p
                      className="relative  py-2 text-lg shadow rounded-xl  mb-1 "
                      style={{ backgroundColor: "#c8e6c9" }}
                    >
                      {dataObj.message}
                    <h6 className="timeReceive pt-1">{dataObj.createdAt}</h6>

                    </p>
                  </li>
                ) : (
                  <li key={index} className="sent">
                    <div>
                      {/* <img src={props?.data.profile || avatar}></img> */}
                      <Avatar
                        sx={
                          props?.data.username !== undefined
                            ? {
                                bgcolor: stringToColor1(props?.data.username),
                                width: 30,
                                height: 30,
                              }
                            : {
                                bgcolor: stringToColor1("G"),
                                width: 30,
                                height: 30,
                              }
                        }
                        src={props?.data.profile}
                        size="sm"
                      >
                        {props?.data.username !== undefined
                          ? props?.data.username.split(" ").length > 1
                            ? props?.data.username
                                .split(" ")[0][0]
                                .toUpperCase() +
                              props?.data.username
                                .split(" ")[1][0]
                                .toUpperCase()
                            : props?.data.username
                                .split(" ")[0][0]
                                .toUpperCase()
                          : "G"}
                      </Avatar>
                    </div>
                    <p className="relative  text-lg bg-white pt-2   shadow rounded-xl">
                      {dataObj.message}
                    <h6 className="timeReceive pt-1">{dataObj.createdAt}</h6>
                    </p>
                  </li>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div className="bg-gray-10 float-right w-[calc(75%-30px)] absolute bottom-4 right-5 h-16 ">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className=" flex pb-0"
          autoComplete="off"
        >
          <input
            placeholder="Type a message"
            className="w-11/12 h-14 bg-gray-10 outline-none ml-3 text-lg"
            onChange={(e) => setMessage(e.target.value)}
            value={chatmessage}
          ></input>
          <div className="w-1/12 text-center m-auto ">
            <button type="submit" className="sendBtn">
              <SendIcon fontSize="large"></SendIcon>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
