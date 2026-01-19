import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssets, createAsset, updateAsset, deleteAsset } from '../services/api';

export const useAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingAsset, setEditingAsset] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        asset_type: 'Bed',
        total_quantity: 1,
        condition: 'Good'
    });
    
    const navigate = useNavigate();
    
    const fetchAssets = async (showToast) => {
        try {
            const response = await getAssets();
            setAssets(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error fetching assets:', err);
            setAssets([]);
            if (err.response?.status === 401 || err.response?.status === 403) {
                navigate('/signin');
            } else if (showToast) {
                showToast('Failed to load assets', 'error');
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchAssets();
    }, []);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e, showToast) => {
        e.preventDefault();
        
        try {
            if (editingAsset) {
                await updateAsset(editingAsset.id, formData);
                showToast('Asset updated successfully!');
            } else {
                await createAsset(formData);
                showToast('Asset created successfully!');
            }
            
            setShowForm(false);
            setEditingAsset(null);
            setFormData({
                name: '',
                asset_type: 'Bed',
                total_quantity: 1,
                condition: 'Good'
            });
            fetchAssets(showToast);
        } catch (err) {
            showToast(err.response?.data?.error || 'Error saving asset', 'error');
        }
    };
    
    const handleEdit = (asset) => {
        setEditingAsset(asset);
        setFormData({
            name: asset.name,
            asset_type: asset.asset_type,
            total_quantity: asset.total_quantity,
            condition: asset.condition
        });
        setShowForm(true);
    };
    
    const handleDelete = async (id, showToast) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await deleteAsset(id);
                showToast('Asset deleted successfully!');
                fetchAssets(showToast);
            } catch (err) {
                showToast('Error deleting asset', 'error');
            }
        }
    };
    
    const handleCancel = () => {
        setShowForm(false);
        setEditingAsset(null);
        setFormData({
            name: '',
            asset_type: 'Bed',
            total_quantity: 1,
            condition: 'Good'
        });
    };
    
    return {
        assets,
        loading,
        showForm,
        editingAsset,
        formData,
        setShowForm,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCancel,
        fetchAssets,
        navigate
    };
};
