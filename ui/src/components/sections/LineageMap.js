import React from 'react';

import { OrgChartComponent } from './OrgChart';
import * as d3 from 'd3';
import { PublicKey, state } from 'snarkyjs';
import { Disciplines } from '../../../../contracts/build/src/models/MartialArtistRepository';
import { FirebaseBackingStore } from '../../../../contracts/build/src/models/firebase/FirebaseBackingStore';
import { Authentication } from '../../modules/Authentication'

import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';

const LineageMap = ({ parentDiscipline }) => {

  const [data, setData] = useState(null);
  const [myParentID, setMyParentIDtData] = useState(0);
  const [show, setShow] = useState(false);
  const [authState, _] = useContext(AuthContext);
  let addNodeChildFunc = null;

  function addNode() {
    const node = {
      nodeId: 'new Node',
      parentNodeId: 'O-6066',
    };

    addNodeChildFunc(node);
  }

  function onNodeClick(nodeId) {
    // console.log('d3', d3.event);
    alert('clicked ' + nodeId);
  }

  useEffect(() => {
    (async () => {
      let discipline = parentDiscipline;//Disciplines.BJJ;
      let backingStore = new FirebaseBackingStore(discipline);
      let data = [];
      let idMap = {};

      let myAddress = authState.userAuthenticated ? authState.userAddress :"B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx";//Authentication.address;
      console.log("my address: ", myAddress);
      let shortName = (address) => {
        if (address && address === myAddress) {
          return "Me";
        } else
          return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
      }

      (await backingStore.getAllVerified())
        .forEach((value, key) => {
          data.push({
            "name": shortName(value.publicKey.toBase58()),//`${value.firstName} ${value.lastName}`,
            "positionName": value.rank.toString(),
            "publicKey": value.publicKey.toBase58(),
            "Instructor": value.getInstructorString(),
            "id": value.id.toString(),
            "imageUrl": "/_next/image?url=%2Fassets%2Fma-logo.png&w=384&q=75",
          });
          idMap[value.publicKey.toBase58()] = value.id.toString();
        });

      // some data maybe missing, so leave out those nodes where instructor is not in the idmap
      let safeData = [];

      for (let i = 0; i < data.length; i++) {
        let value = data[i];
        if (value.Instructor && idMap[value.Instructor]) {
          value.parentId = idMap[value.Instructor];
          safeData.push(value);

          if (value.publicKey && value.publicKey === myAddress) {
            setMyParentIDtData(value.parentId);
          }
        }
        else if (value.Instructor) {
          // console.log("Missing instructor: ", value.Instructor);
          // console.log("choosing a random instructor, this should be fixed in the data generation");
          
          // choose a random instructor
          value.parentId = 1;
          // console.log("chose: ", value);
          safeData.push(value);

          if (value.publicKey && value.publicKey === myAddress) {
            setMyParentIDtData(value.parentId);
          }
        }
        else if (!value.Instructor) {
          safeData.push(value);
        }
        else {
          console.log("Fall through: ", value);
        }
      }

      // for (let i = 0; i < safeData.length; i++) {
      //   let value = safeData[i];
      //   console.log("id: ", value.id, " parent: ", value.parentId, "key: ", value.publicKey, "instructor: ", value.Instructor);
      // }


      // console.log(data.length);
      setData(safeData);
      setShow(true);

    })();
    let arr = [
      {
        "name": "Helio Gracie",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CTO office",
        "tags": "Ceo,tag1,manager,cto",
        "isLoggedUser": false,
        "positionName": "Grand Master",
        "id": "O-6066",
        "parentId": "",
        "size": ""
      },
      {
        "name": "Pedro Sauer",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CEO office",
        "tags": "Ceo,tag1, tag2",
        "isLoggedUser": false,
        "positionName": "Master",
        "id": "O-6067",
        "parentId": "O-6066",
        "size": ""
      },
      {
        "name": "Leverling Janet",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CEO office",
        "tags": "Ceo,tag1, tag2",
        "isLoggedUser": false,
        "positionName": "CTO",
        "id": "O-6068",
        "parentId": "O-6066",
        "size": ""
      },
      {
        "name": "Leverling Janet",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CEO office",
        "tags": "Ceo,tag1, tag2",
        "isLoggedUser": false,
        "positionName": "CTO",
        "id": "O-6069",
        "parentId": "O-6066",
        "size": ""
      },
      {
        "name": "Leverling Janet",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CEO office",
        "tags": "Ceo,tag1, tag2",
        "isLoggedUser": false,
        "positionName": "CTO",
        "id": "O-6070",
        "parentId": "O-6066",
        "size": ""
      },
      {
        "name": "Leverling Janet",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CEO office",
        "tags": "Ceo,tag1, tag2",
        "isLoggedUser": false,
        "positionName": "CTO",
        "id": "O-6071",
        "parentId": "O-6067",
        "size": ""
      },
      {
        "name": "Fuller Andrew",
        "imageUrl": "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg",
        "area": "Corporate",
        "profileUrl": "http://example.com/employee/profile",
        "office": "CEO office",
        "tags": "Ceo,tag1, tag2",
        "isLoggedUser": false,
        "positionName": "Linear Manager",
        "id": "O-6072",
        "parentId": "O-6067",
        "size": ""
      }
    ];
    //setData(arr);
    //setShow(true);

  }, [true]);

  return (
    <div>
      {show &&
        <OrgChartComponent
          setClick={(click) => (addNodeChildFunc = click)}
          onNodeClick={onNodeClick}
          data={data}
        />}
    </div>
  );
}

export default LineageMap;
