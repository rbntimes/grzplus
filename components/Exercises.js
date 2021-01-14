import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { DatePicker, Divider } from "antd";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import Youtube from "react-youtube";
const Card = styled.article`
  background: white;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

const Box = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 4px;
  padding: 4px;
`;

const Value = styled.h2`
  font-size: 1.5rem;
`;

const Content = styled.p`
  color: gray;
`;

export default ({ value, setValue, editable }) => {
  const [video, setVideo] = useState(value);
  useEffect(() => {
    setValue(video);
  }, [video]);

  useEffect(() => {
    setVideo(value);
  }, [value]);

  return (
    <>
      <label>
        Plaats hier een youtube video
        <div>
          <input value={video} onChange={e => setVideo(e.target.value)} />
        </div>
      </label>
      <Divider />
      <Youtube opts={{ width: "100%" }} videoId={video} />
    </>
  );
};
