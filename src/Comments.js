import React, { createElement, useState, useEffect } from 'react';
import { Comment, Avatar, Tooltip, Form, Button, List, Input } from 'antd';
import "antd/dist/antd.css";
import {
	LikeOutlined, DislikeFilled,
	DislikeOutlined, LikeFilled
} from '@ant-design/icons';
import "bootstrap/dist/css/bootstrap.css";
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
				Add Comment
			</Button>
		</Form.Item>
	</>
);

const generateComments = (comments) => {

	let commentsJSX = comments.map((comment) => {
		return (
			<Comment
				actions={[<span key="comment-nested-reply-to">Reply to</span>]}
				author={<a>{comment.userName}</a>}
				avatar={<Avatar src={comment.avatar} alt={comment.userName} />}
				content={comment.content}
			>
			</Comment>
		);
	});
	return (
		<>
			{commentsJSX}
		</>
	);
};

export default function Comments(props) {
	const [likesCount, setLikesCount] = useState(props.post.like);
	const [dislikesCount, setDislikesCount] = useState(props.post.disLike);
	const [action, setAction] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState('');
	const [comments, setComments] = useState(props.post.comment.length > 0 ? [...props.post.comment] : []);
	const [showComment, setShowComment] = useState(false);

	useEffect(()=>{
		console.log(props.post);
	},[props.post.userName])

	const handleSubmit = () => {
		if (!value) {
			return;
		}
		setSubmitting(true)

		setTimeout(() => {
			setSubmitting(false)
			setValue('')
			let prevComments = [...comments]
			prevComments.push({
				author: 'Han Solo',
				avatar: 'https://joeschmoe.io/api/v1/random',
				content: <p>{value}</p>,
			})
			setComments(prevComments);
			setShowComment(false);
		}, 1000);
	};

	const handleChange = e => {
		setValue(e.target.value)
	};

	return (
		<Comment
			style={{padding:'2em',background:'#eee6e6',marginBottom:"2em",borderRadius:"4%",boxShadow:"rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px"}}
			author={<a>{props.post.userName}</a>}
			avatar={<Avatar src={props.post.avatar} alt={props.post.userName} />}
			content={
				<>
					<h6>{props.post.title}</h6>
					<p>
						{props.post.content}
					</p>
				</>
			}
			actions={[
				<Tooltip title="Like">
					<span onClick={() => {
						setLikesCount(1);
						setDislikesCount(0);
						setAction('liked');
					}}>
						{createElement(action === 'liked' ?
							LikeFilled : LikeOutlined)}
						{likesCount}
					</span>
				</Tooltip>,
				<Tooltip title="Dislike">
					<span onClick={() => {
						setLikesCount(0);
						setDislikesCount(1);
						setAction('disliked');
					}}>
						{React.createElement(action === 'disliked' ?
							DislikeFilled : DislikeOutlined)}
						{dislikesCount}
					</span>
				</Tooltip>,
				<Tooltip title="Comment">
					<span onClick={() => { setShowComment(true) }} key="comment-list-reply-to-0">Comment</span>
				</Tooltip>
			]}
		>
			{showComment &&
				<Editor
					onChange={handleChange}
					onSubmit={handleSubmit}
					submitting={submitting}
					value={value}
				/>
			}
			{generateComments(comments)}
		</Comment>
	);
}