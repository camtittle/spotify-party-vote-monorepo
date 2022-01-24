import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SpotifyCallback } from "./components/pages/SpotifyCallback";
import { LoginWithSpotify } from "./components/pages/LoginWithSpotify";
import { SpotifyCredentialsProvider } from "./contexts/spotifyCredentialsContext";

function App() {
  return (
      <SpotifyCredentialsProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/spotify/login" element={<LoginWithSpotify />} />
                  <Route path="spotify/callback" element={<SpotifyCallback />} />
              </Routes>
          </BrowserRouter>
      </SpotifyCredentialsProvider>
  );
}

export default App;
