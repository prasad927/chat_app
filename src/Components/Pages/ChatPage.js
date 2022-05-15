import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import SideDrawer from '../Mis/SideDrawer';
import MyChats from '../MyChats';
import ChatBox from '../ChatBox'

import {Box} from  '@chakra-ui/react'

const ChatPage = () => {
  const {user}= ChatState();
  const [fetchAgain,setFetchAgain] = useState(false)

  return (
    <div style={{width:"100%"}}>
            {user && <SideDrawer/>}

            <Box 
               d="flex"
               justifyContent="space-between" 
               w="100%"
               h="91.5vh" 
               p="10px"
            >
                 {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
                 {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
    </div>
  )
}

export default ChatPage;