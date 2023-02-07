import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import PauseIcon from "@mui/icons-material/Pause";

import napster from "../services/napster";

import "./style.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Player() {
  const [expanded, setExpanded] = React.useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const music = useRef();
  const key = "ZTVhYTU3MWEtZjRhNy00MmRmLWJiZDAtNjQwNTAwN2E0ODhi";

  useEffect(() => {
    getMusics();
  }, []);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const getMusics = async () => {
    let musics = await napster.get(`top?apikey=${key}`).then((r) => r);
    setTracks(musics.data.tracks);
  };

  const loadSong = (url) => {
    music.current.src = url;
    play();
  };

  const play = () => {
    music.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    music.current.pause();
    setIsPlaying(false);
  };

  const next = () => {
    setCurrentIndex((i) => (i > 19 ? 0 : i + 1));
    loadSong(currentIndex + 1);
  };

  const prev = () => {
    setCurrentIndex((i) => (i < 0 ? 19 : i - 1));
    loadSong(currentIndex - 1);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="container" sx={{ maxWidth: 345 }}>
      {/* header */}
      <CardHeader className="header-title" title="MP3 Player" />

      {/* Capa */}
      <CardMedia
        component="img"
        height="194"
        image="http://1.bp.blogspot.com/-Tk5i7cRrKHA/VVnEOwgWr7I/AAAAAAAA1fY/qG_pijBKA60/s1600/mariagaduguelacapa.png"
        alt="Paella dish"
      />

      {/* informações */}
      <CardContent className="body-description">
        <Link to={"description"}>
          <IconButton aria-label="settings">
            <MenuIcon />
          </IconButton>
        </Link>

        <Typography variant="body2" color="text.primary" style={{fontWeight: 'bold'}}>
          {tracks[currentIndex]?.albumName}
        </Typography>
        <Typography variant="h6" color="text.primary">
          {tracks[currentIndex]?.name} - {tracks[currentIndex]?.artistName}
        </Typography>
      </CardContent>

      <audio
        ref={music}
        src={
          tracks[currentIndex]?.previewURL ||
          "https://listen.hs.llnwd.net/g2/prvw/4/2/4/9/8/911189424.mp3"
        }
      ></audio>

      {/* butões */}
      <CardContent className="buttons">
        <IconButton aria-label="play">
          <FastRewindIcon fontSize="large" onClick={prev} />
        </IconButton>

        <IconButton aria-label="play-pause" onClick={isPlaying ? pause : play}>
          {isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayCircleIcon fontSize="large" />
          )}
        </IconButton>

        <IconButton aria-label="play">
          <FastForwardIcon fontSize="large" onClick={next} />
        </IconButton>
      </CardContent>

      {/* Rodapé */}
      <CardActions disableSpacing className="footer">
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Letra:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
