import React, { useState } from 'react';
import { Upload, message, Avatar } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';

const ProfilePictureUpload = ({ imageUrl, setImageUrl }) => {
  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await fetch('http://localhost:3000/users/uploadProfilePicture', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        // Assuming data contains the URL of the uploaded image
        setImageUrl(data.imagePath); // Update imageUrl with the URL of the uploaded image
      } else {
        console.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
  
    if (info.file.status === 'done') {
      try {
        await handleUpload(info.file.originFileObj);
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      } catch (error) {
        console.error('Error handling file upload:', error);
      }
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Upload
      name="profilePicture"
      listType="picture-circle"
      className="avatar-uploader"
      showUploadList={false}
      action="http://localhost:3000/users/uploadProfilePicture"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Avatar size={120} src={imageUrl} />
      ) : (
        <Avatar size={120} icon={loading ? <LoadingOutlined /> : <UserOutlined />} />
      )}
    </Upload>
  );
};

export default ProfilePictureUpload;
