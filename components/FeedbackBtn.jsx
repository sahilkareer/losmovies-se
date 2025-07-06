"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import Feedback from './Feedback'

const FeedbackBtn = ({varient}) => {

    const [selectedId, setSelectedId] = useState(false)

  return (
    <>
        <motion.div layoutId={"true"} onClick={() => setSelectedId(true)}>
            <motion.span className={`cursor-pointer hover:opacity-100 ${varient == "mobile" ? "opacity-100" : "opacity-80"} transition duration-200`}>Feedback</motion.span>
        </motion.div>

        <AnimatePresence>
        {selectedId && (
            <motion.div 
            layoutId={selectedId}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className='fixed top-0 left-0 w-screen h-screen z-[52] flex justify-center items-center'> 
            <motion.div 
                className='fixed top-0 left-0 w-screen h-screen z-[53] bg-black bg-opacity-30'
                onClick={() => {setSelectedId(false)}}
            />
                <Feedback setId={setSelectedId}/>
            </motion.div>
        )}
        </AnimatePresence>
    </>
  )
}

export default FeedbackBtn