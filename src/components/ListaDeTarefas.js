import React, { useState, useEffect } from 'react'
import "./ListaDeTarefas.css"

import firebase from './firebaseConfig'
import Navbar from './Navbar';

import TaskAPI from './daoTask';

let userId = null;

function ListaDeProdutos() {
    //let userId = 'unkn'

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userId = user.uid
            //console.log(user)

        } else {
            window.location.href = "/cadastro"
        }
    })

    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {

        const fetchTasks = async () => {
        try {
            const tasksFromAPI = await TaskAPI.readTasks(userId);
            setProdutos(tasksFromAPI);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
        };

        fetchTasks();
    }, [produtos]);

    const adicionarProduto = async () => {
        try {
          const newTaskId = await TaskAPI.createTask({ "descricao": novoProduto}, userId);
          // Atualize a lista de produtos após a adição
          const updatedTasks = [...produtos, { id: newTaskId, descricao: novoProduto },userId];
          setProdutos(updatedTasks);
          setNovoProduto('');

          setMostrarFormulario(false);
          //setNewTaskTitle(''); // Limpa o campo de entrada após a adição da produto
        } catch (error) {
          console.error('Erro ao adicionar produto:', error);
        }
      };

    const removerProduto = async (taskId,userId) => {
        try {
          await TaskAPI.deleteTask(taskId,userId);
          // Atualize a lista de produtos após a remoção
          const updatedTasks = produtos.filter(task => task.id !== taskId);
          setProdutos(updatedTasks);
        } catch (error) {
          console.error('Erro ao excluir produto:', error);
        }
      };

    return (
        <div className="lista-de-tarefas">
            <h1>Produtos Etec</h1>
            <Navbar />
            {mostrarFormulario && (
                <div className="adicionar-tarefa">
                    <input
                        type="text"
                        value={novoProduto}
                        onChange={(e) => setNovoProduto(e.target.value)}
                        placeholder="Digite um produto"
                    />
                    
                </div>
            )}
            {!mostrarFormulario && (
                <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
            )}
            <ul>
                {produtos.map(task => (
                    <li key={task.id} className="tarefa">
                        <div>{task.descricao}</div>
                        <div className="remover-tarefa" onClick={() => removerProduto(task.id,userId)}>Excluir</div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default ListaDeProdutos