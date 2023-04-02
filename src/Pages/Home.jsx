import { Typography, List, ListItem } from "@mui/material";
import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import HorizontalCard from "../Components/HorizontalCard";
import Modal from "../Components/Modal";
import VerticalCard from "../Components/VerticalCard";
import { useAuthContext } from "../context/authContext";
import { useListContext } from "../context/ListContext";

const Home = () => {
  const { user } = useAuthContext();
  const { list, setList } = useListContext();
  const [open, setOpen] = useState(false);
  const [ModalProps, setModalProps] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchdata = async () => {
    setIsLoading(true);
    console.log("called");
    if (user) {
      const token = await user?.getIdToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/getlist`,
        config
      );
      if (res.data) {
        setList(res.data);
        setIsLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user) {
      fetchdata();
    }
  }, [user]);
  const closeModal = () => {
    setOpen(false);
    setModalProps(undefined);
  };
  const handleModal = (obj) => {
    setModalProps(obj);
    setOpen(true);
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const completedIndex = list.findIndex((i) => i.completed === true);
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (completedIndex >= 0) {
      items.splice(
        result.destination.index < list.findIndex((i) => i.completed === true)
          ? result.destination.index
          : list.findIndex((i) => i.completed === true) - 1,
        0,
        reorderedItem
      );
    } else {
      items.splice(result.destination.index, 0, reorderedItem);
    }

    setList(items);
  };
  if (isLoading) {
    return (
      <div
        style={{
          marginTop: "6rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        marginTop: "2.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {list && list.length ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="bucketList">
            {(provided) => (
              <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                width="100%"
              >
                {list.map((l, i) => {
                  const img = new Image();
                  img.src = l.image;
                  return (
                    <Draggable
                      key={l.id}
                      draggableId={l.id}
                      index={i}
                      isDragDisabled={l.completed}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleModal(l)}
                        >
                          {img.height >= img.width ? (
                            <HorizontalCard item={l} />
                          ) : (
                            <VerticalCard item={l} />
                          )}
                        </ListItem>
                      )}
                    </Draggable>
                  );
                })}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Typography>List Empty</Typography>
      )}
      <Modal open={open} props={ModalProps} close={closeModal} />
    </div>
  );
};

export default Home;
