import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { api } from "services/config";

import Footer from "components/Footer";
import Header from "components/Header";
import Spinner from "components/Spinner";

import { ReactComponent as Icon } from "assets/upload-icon.svg";

import {
  Overlay,
  Container,
  DataContainer,
  ImageContainer,
  ImageInputContainer,
  InputContainer,
  TitleContainer,
  Button,
} from "./styles";

const DEFAULT_VALUES = {
  model: "",
  name: "",
  price: 0,
  color: "",
  kilometers: 0,
  year: new Date(),
  makeId: 4,
};

function CarSell() {
  const [image, setImage] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const startingYear = 1980;
  const currentYear = new Date().getFullYear() + 1;

  const { handleSubmit, register } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const handleImage = async ({ target }) => {
    const file = target.files[0];

    const imageObj = URL.createObjectURL(file);
    setImage({ file: file, preview: imageObj });
  };

  const handleCarRegister = async (payload) => {
    try {
      setIsFetching(true);
      Object.keys({ ...payload }).forEach((key) => {
        if (key in payload) {
          if (typeof payload[key] === "string") {
            payload[key] = payload[key]?.toLowerCase();
          }
          if (key === "year") {
            payload[key] = new Date(payload[key], 0);
          }
        }
      });

      await api.post("api/Car/addcar", payload).then(async (res) => {
        const formData = new FormData();
        formData.append("File", image.file);
        formData.append("CarId", res.data.data.id);
        await api.post(`api/Image/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });
      navigate(`/cars`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Header isSell />
      <Container onSubmit={handleSubmit(handleCarRegister)}>
        <DataContainer>
          <h1>Vehicle information</h1>
          <TitleContainer>
            <h2>Year & Make</h2>
            {Array.from({ length: 10 })}
            <InputContainer>
              <select
                name="year"
                defaultValue={0}
                id=""
                {...register("year", { required: true })}
              >
                <option value={0} disabled hidden>
                  Year
                </option>

                {Array.from({ length: currentYear - startingYear }).map(
                  (item, index) => (
                    <option
                      value={startingYear + index}
                      key={startingYear + index}
                    >
                      {startingYear + index}
                    </option>
                  )
                )}
              </select>

              <select
                defaultValue={0}
                name="make"
                {...register("makeId", { required: true })}
              >
                <option value={0} disabled hidden>
                  Make
                </option>
                <option value={1}>Toyota</option>
                <option value={2}>Mitsubishi</option>
                <option value={3}>Ford</option>
                <option value={4}>Audi</option>
                <option value={5}>Volkswagen</option>
              </select>
            </InputContainer>
          </TitleContainer>
          <TitleContainer>
            <h2>Model</h2>
            <InputContainer>
              <input
                type="text"
                placeholder="Model"
                {...register("model", { required: true })}
              />
            </InputContainer>
          </TitleContainer>
          <TitleContainer>
            <h2>Name & Color</h2>
            <InputContainer>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              <input
                type="text"
                placeholder="Color"
                {...register("color", { required: true })}
              />
              {/* selecT? */}
            </InputContainer>
          </TitleContainer>
          <TitleContainer>
            <h2>Mileage & Price</h2>
            <InputContainer>
              <input
                type="number"
                placeholder="Kilometers"
                {...register("kilometers", { required: true })}
              />
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
              />
            </InputContainer>
          </TitleContainer>
          <ImageInputContainer>
            <ImageContainer
              className="image-container"
              htmlFor="image"
              source={image?.preview}
            >
              {!image && (
                <>
                  <Icon fill="grey" />
                  <h3>Click here to upload an image of your car.</h3>
                </>
              )}
              <input type="file" id="image" onChange={handleImage} />
            </ImageContainer>
          </ImageInputContainer>
        </DataContainer>
        <Button>Register your vehicle</Button>
        {isFetching && (
          <Overlay>
            <Spinner />
          </Overlay>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Container>
      <Footer isBasic={true} />
    </>
  );
}

export default CarSell;
