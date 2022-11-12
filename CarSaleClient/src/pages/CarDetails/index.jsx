import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Footer from "components/Footer";
import Header from "components/Header";
import Spinner from "components/Spinner";

import { api } from "services/config";

import { ReactComponent as Icon } from "assets/upload-icon.svg";
import { ReactComponent as MissingIcon } from "assets/not-found-icon.svg";

import {
  Container,
  Overlay,
  InfoContainer,
  Button,
  TextContainer,
  ImageContainer,
  InputContainer,
} from "./styles";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const startingYear = 1980;
  const currentYear = new Date().getFullYear() + 1;

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      await api.get(`api/Car/getcar/${id}`).then((res) => {
        setCar(res.data.data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const DEFAULT_VALUES = {
    model: "",
    name: "",
    price: 0,
    color: "",
    kilometers: 0,
    year: 0,
  };

  const { handleSubmit, register } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImage = async ({ target }) => {
    const file = target.files[0];
    const imageObj = URL.createObjectURL(file);
    setImage({ file: file, preview: imageObj });
  };

  const handleCarUpdate = async (payload) => {
    try {
      setIsFetching(true);

      Object.keys({ ...payload }).forEach((key) => {
        if (key in payload) {
          if (typeof payload[key] === "string") {
            payload[key] = payload[key]?.toLowerCase();
          }
          if (key === "year") {
            if (payload[key] === 0) {
              delete payload[key];
            } else {
              payload[key] = new Date(payload[key], 0);
            }
          }
          if (!payload[key]) {
            delete payload[key];
          }
        }
      });

      await api
        .put("api/Car/updatecar", { id, ...payload })
        .then(async (res) => {
          if (image) {
            console.log("A");
            const formData = new FormData();

            formData.append("file", image.file);

            if (car?.photo) {
              formData.append("PublicId", car.photo.publicId);
              await api
                .put(`api/Image/update`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => console.log(res.data.data));
            } else {
              formData.append("CarId", car.id);
              await api.post(`api/Image/add`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            }
          }
        });

      navigate(`/cars`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleCarDelete = async () => {
    try {
      setIsFetching(true);
      await api.delete(`api/Car/deletecar/${car.id}`);
      navigate(`/cars`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsFetching(false);
    }
  };

  const verifySesion = () => {
    const userData = localStorage.getItem("data");

    if (!userData) {
      navigate("/");
      return false;
    }
    return true;
  };

  const handleBuy = () => {
    const result = verifySesion();

    if (result) {
      console.log("DONE!");
    }
  };

  return (
    <>
      {isFetching && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      <Header />
      <Container>
        {car && (
          <>
            <div className="mega-container">
              <div className="navbar">
                <p className="navlink" onClick={() => navigate("/cars")}>
                  COMPRA DE AUTOS
                </p>
                /
                <p className="nav-desc">
                  {car.make?.name} {car.model}
                </p>
                /
                <p className="nav-desc">
                  {car.make?.name + " " + car.model + " " + car?.name}
                </p>
              </div>
              <InfoContainer className="info-container">
                {isEditing ? (
                  <>
                    <ImageContainer
                      className="image-container"
                      htmlFor="image"
                      source={image?.preview}
                    >
                      {!image && (
                        <>
                          <Icon fill="grey" />
                          <h4>Click here to upload an image of your car.</h4>
                        </>
                      )}
                      <input type="file" id="image" onChange={handleImage} />
                    </ImageContainer>
                  </>
                ) : (
                  <>
                    <ImageContainer className="image-container">
                      {car.photo?.photoURL ? (
                        <img src={car.photo?.photoURL} alt={car?.name} />
                      ) : (
                        <div>
                          <MissingIcon className="missing-icon" fill="grey" />
                        </div>
                      )}
                    </ImageContainer>
                  </>
                )}

                <TextContainer onSubmit={handleSubmit(handleCarUpdate)}>
                  {isEditing ? (
                    <>
                      <InputContainer>
                        <input
                          type="text"
                          placeholder={car.model}
                          {...register("model", { required: false })}
                        />
                        <input
                          type="text"
                          placeholder={car?.name}
                          {...register("name", { required: false })}
                        />
                      </InputContainer>
                      <InputContainer>
                        <select
                          name="year"
                          defaultValue={0}
                          id=""
                          {...register("year", { required: false })}
                        >
                          <option disabled hidden>
                            Year
                          </option>

                          {Array.from({
                            length: currentYear - startingYear,
                          }).map((item, index) => (
                            <option
                              value={startingYear + index}
                              key={startingYear + index}
                            >
                              {startingYear + index}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder={car.kilometers}
                          {...register("kilometers", { required: false })}
                        />
                        <input
                          type="text"
                          placeholder={car.color}
                          {...register("color", { required: false })}
                        />
                      </InputContainer>
                      <InputContainer>
                        <input
                          type="number"
                          placeholder={car.price}
                          {...register("price", { required: false })}
                        />
                      </InputContainer>
                      <Button type="button" onClick={() => handleEdit()}>
                        Nevermind
                      </Button>
                      <Button type="submit">Upload modifications</Button>
                    </>
                  ) : (
                    <>
                      <div className="name-container">
                        <p>
                          {car.make?.name + " " + car.model + " " + car?.name}
                        </p>
                      </div>
                      <div className="char-container">
                        <p>
                          {car.year?.split("-")[0] +
                            " • " +
                            car.kilometers +
                            "Km • " +
                            car.color}
                        </p>
                      </div>
                      <div className="price-container">
                        <p>Price:</p>
                        <p className="price">
                          {"R$ " + car.price?.toLocaleString()}
                        </p>
                      </div>
                      <Button type="button" onClick={() => handleBuy()}>
                        I'm interested!
                      </Button>
                      {localStorage.getItem("data") && (
                        <>
                          <Button type="button" onClick={() => handleEdit()}>
                            Edit car's information
                          </Button>
                          <Button type="button" onClick={handleCarDelete}>
                            Delete car
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </TextContainer>
              </InfoContainer>
            </div>
          </>
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

      <Footer />
    </>
  );
}

export default CarDetails;
