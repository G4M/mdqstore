import React, { useEffect, useState } from 'react';
import { GetDBFireBase } from "../../Tools/firebase";
import ItemList from '../../components/ItemList/ItemList';

function Home() {

  return (
    <div className="Home">
          <ItemList />
    </div>
  );
}

export default Home;
