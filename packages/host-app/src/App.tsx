import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { SpotifyCallback } from "./components/pages/SpotifyCallback";
import { LoginWithSpotify } from "./components/pages/LoginWithSpotify";
import { PartyProvider } from "./contexts/partyContext";
import { Party } from "./components/pages/Party";

function App() {
  return (
      <PartyProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/spotify/login" element={<LoginWithSpotify />} />
                  <Route path="spotify/callback" element={<SpotifyCallback />} />
                  <Route path="/party" element={<Party />} />
              </Routes>
          </BrowserRouter>
      </PartyProvider>
  );
}

export default App;
