import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../services/api';

export const useRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    
    const [formData, setFormData] = useState({
        room_number: '',
        hostel_name: '',
        floor: '',
        capacity: 2
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchRooms();
    }, []);
    
    const fetchRooms = async () => {
        try {
            const response = await getRooms();
            setRooms(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error fetching rooms:', err);
            setRooms([]);
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e, showToast) => {
        e.preventDefault();
        
        try {
            if (editingRoom) {
                await updateRoom(editingRoom.id, formData);
                showToast('Room updated successfully!', 'success');
            } else {
                await createRoom(formData);
                showToast('Room created successfully!', 'success');
            }
            
            setShowForm(false);
            setEditingRoom(null);
            setFormData({
                room_number: '',
                hostel_name: '',
                floor: '',
                capacity: 2
            });
            fetchRooms();
        } catch (err) {
            showToast('Error saving room: ' + (err.response?.data?.error || 'Unknown error'), 'error');
        }
    };
    
    const handleEdit = (room) => {
        setEditingRoom(room);
        setFormData({
            room_number: room.room_number,
            hostel_name: room.hostel_name,
            floor: room.floor || '',
            capacity: room.capacity
        });
        setShowForm(true);
    };
    
    const handleDelete = async (id, showToast) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await deleteRoom(id);
                showToast('Room deleted successfully!', 'success');
                fetchRooms();
            } catch (err) {
                showToast('Error deleting room', 'error');
            }
        }
    };
    
    const handleCancel = () => {
        setShowForm(false);
        setEditingRoom(null);
        setFormData({
            room_number: '',
            hostel_name: '',
            floor: '',
            capacity: 2
        });
    };
    
    return {
        rooms,
        loading,
        showForm,
        editingRoom,
        formData,
        setShowForm,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancel,
        navigate
    };
};
