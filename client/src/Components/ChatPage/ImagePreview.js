import React, { useEffect, useState } from "react";

const ImagePreview = ({imgURL}) => {
    return(
        <div className="ImageUploadPreview"> 
           <img src={imgURL} height={'200px'}/>
        </div>
    )
}

export default ImagePreview
