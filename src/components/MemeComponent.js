import React, { useEffect, useState } from "react";
import Axios from "axios";
import Draggable, { DraggableCore } from "react-draggable";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default function Meme() {
  const [picture, setPicture] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [black, setBlack] = useState(true);
  const [fontSize, setFontSize] = useState(30);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    colorChange();
    const randomNum = Math.floor(Math.random() * 100);
    await Axios.get("https://api.imgflip.com/get_memes")
      .then((response) => setPicture(response.data.data.memes[randomNum].url))
      .catch((error) => console.log(error));
  };

  const clearInput = () => {
    document.getElementsByClassName("text1")[0].innerHTML = "";
    document.getElementById("input1").value = "";
    document.getElementsByClassName("text2")[0].innerHTML = "";
    document.getElementById("input2").value = "";
    document.getElementsByClassName("text3")[0].innerHTML = "";
    document.getElementById("input3").value = "";
  };

  const upload = (e) => {
    setPicture({ file: URL.createObjectURL(e.target.files[0]) }.file);
  };

  const saveImg = () => {
    const node = document.getElementById("Meme");
    domtoimage.toBlob(node).then(function (image) {
      window.saveAs(image, "Meme.png");
    });
  };

  const colorChange = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`;
  };

  return (
    <div className="App">
      <h1>Meme Generator</h1>
      <input
        placeholder="TOP TEXT"
        id="input1"
        onChange={(e) => setText1(e.target.value.toUpperCase())}
      />
      <button
        onClick={() => {
          fetchData();
          clearInput();
        }}
      >
        Generate
      </button>
      <input
        placeholder="BOTTOM TEXT"
        id="input2"
        onChange={(e) => setText2(e.target.value.toUpperCase())}
      />
      <br />
      <button onClick={() => setFontSize(fontSize + 5)}>
        Increase Font Size
      </button>
      <button onClick={() => setBlack(!black)}>Change Font Color</button>
      <button onClick={() => setFontSize(fontSize - 5)}>
        Decrease Font Size
      </button>
      <br />
      <input
        type="file"
        onChange={upload}
        accept="image/x-png,image/gif,image/jpeg"
      />
      <button onClick={saveImg}>Save Meme</button>
      <br />
      <input
        placeholder="MIDDLE TEXT"
        id="input3"
        onChange={(e) => setText3(e.target.value.toUpperCase())}
      />

      <div className="container">
        <div id="Meme">
          <Draggable bounds={{ top: -20, left: -220, right: 220, bottom: 300 }}>
            <div>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  color: black ? "black" : "white"
                }}
                className="text1"
              >
                {text1}
              </p>
            </div>
          </Draggable>

          {picture && <img src={picture} />}

          <Draggable bounds={{ left: -220, right: 220, bottom: 250 }}>
            <div>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  color: black ? "black" : "white"
                }}
                className="text3"
              >
                {text3}
              </p>
            </div>
          </Draggable>

          <Draggable bounds={{ top: -300, left: -220, right: 220, bottom: 15 }}>
            <div>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  color: black ? "black" : "white"
                }}
                className="text2"
              >
                {text2}
              </p>
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
}
