import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import SideDrawer from '../Mis/SideDrawer';
import MyChats from '../MyChats';
import ChatBox from '../ChatBox'

import {Box} from  '@chakra-ui/react'

const ChatPage = () => {
  const {user}= ChatState();

  return (
    <div style={{width:"100%"}}>
            {user && <SideDrawer/>}

            <Box 
               d="flext"
               justifyContent="space-between" 
               w="100%"
               h="91.5vh" 
               p="10px"
            >
                 {user && <MyChats/>}
                 {user && <ChatBox/>}
            </Box>
    </div>
  )
}

export default ChatPage;