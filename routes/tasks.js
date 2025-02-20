const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/create', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la tarea', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar la tarea' });
  }
});

router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});

router.put('/id/:_id', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
});

router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});

module.exports = router;
