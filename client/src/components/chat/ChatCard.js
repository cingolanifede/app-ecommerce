import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar, Image } from 'antd';

const ChatCard = (props) => {
  console.log('CARDS :', props);
  return (
    <div style={{ width: '100%' }}>
      <Comment
        author={`${props.postedByUser.firstName} ${props.postedByUser.lastName}`}
        avatar={
          <Avatar
            src={props.postedByUser.email}
            alt={props.postedByUser.firstName}
          />
        }
        content={
          props.message.messageText.substring(0, 8) === 'uploads/' ? (
            // this will be either video or image

            props.message.messageText.substring(
              props.message.messageText.length - 3,
              props.message.messageText.length
            ) === 'mp4' ? (
              <video
                style={{ maxWidth: '200px' }}
                src={`http://localhost:5000/${props.message}`}
                alt="video"
                type="video/mp4"
                controls
              />
            ) : (
              <Image
                width={200}
                style={{ maxWidth: '200px' }}
                src={`http://localhost:5000/${props.message}`}
                alt="img"
              />
            )
          ) : (
            <p>{props.message.messageText}</p>
          )
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
};

export default ChatCard;
