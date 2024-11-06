import type {Component} from 'solid-js';
import {auth, Tasks} from '~/lib/firebase';
import {useAuth, useFirestore} from 'solid-firebase';
import Collection from '~/lib/Collection';
import {addDoc, orderBy, query, Timestamp} from 'firebase/firestore';

import styles from './index.module.css';

const Index: Component = () => {
	const tasks = useFirestore(query(Tasks, orderBy('createdAt', 'asc')));
	const authState = useAuth(auth);

	const onClickAddTask = async () => {
		if (!authState.data) {
			return;
		}

		const input = document.querySelector('input') as HTMLInputElement;
		const task = input.value;

		await addDoc(Tasks, {
			task,
			uid: authState.data.uid,
			createdAt: Timestamp.now(),
		});

		input.value = '';
	};

	return (
		<ul class={styles.tasks}>
			<Collection data={tasks}>
				{(taskData) => <li class={styles.task}>{taskData.task}</li>}
			</Collection>
			<li class={styles.addTask}>
				<input type="text" />
				<button
					type="button"
					onClick={onClickAddTask}
					disabled={!authState.data}
				>
					Add Task
				</button>
			</li>
		</ul>
	);
};

export default Index;
