/**
 * useDamageTracking Hook (Controller Layer)
 * ==========================================
 * 
 * Business logic for Damage Tracking
 * Handles: state management, API calls, form submission, status updates
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, createDamageReport, getDamageReports, updateDamageReport, deleteDamageReport } from '../services/api';

export const useDamageTracking = () => {
    const [rooms, setRooms] = useState([]);
    const [damageReports, setDamageReports] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [assetType, setAssetType] = useState('Bed');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    
    const ASSET_TYPES = ['Bed', 'Table', 'Chair', 'Cupboard', 'Fan', 'Light', 'Other'];
    
    useEffect(() => {
        fetchRooms();
        fetchDamageReports();
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
    
    const fetchDamageReports = async () => {
        try {
            const response = await getDamageReports();
            setDamageReports(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Error fetching damage reports:', err);
            setDamageReports([]);
        }
    };
    
    const handleSubmit = async (e, showToast) => {
        e.preventDefault();
        
        if (!selectedRoom) {
            showToast('Please select a room', 'error');
            return;
        }
        
        if (!description.trim()) {
            showToast('Please enter damage description', 'error');
            return;
        }
        
        try {
            await createDamageReport({
                room: selectedRoom,
                asset_type: assetType,
                description: description.trim()
            });
            
            showToast('Damage report added successfully!', 'success');
            
            setDescription('');
            fetchDamageReports();
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to add damage report', 'error');
            console.error('Error:', err);
        }
    };
    
    const handleStatusChange = async (reportId, newStatus, showToast) => {
        try {
            const report = damageReports.find(r => r.id === reportId);
            await updateDamageReport(reportId, {
                ...report,
                status: newStatus
            });
            
            showToast('Status updated successfully!', 'success');
            fetchDamageReports();
        } catch (err) {
            showToast('Error updating status', 'error');
            console.error('Error:', err);
        }
    };
    
    const handleDelete = async (reportId, roomNumber, assetType, showToast) => {
        if (window.confirm(`Delete damage report for ${assetType} in Room ${roomNumber}?`)) {
            try {
                await deleteDamageReport(reportId);
                showToast('Damage report deleted successfully!', 'success');
                fetchDamageReports();
            } catch (err) {
                showToast('Error deleting report', 'error');
                console.error('Error:', err);
            }
        }
    };
    
    return {
        rooms,
        damageReports,
        selectedRoom,
        assetType,
        description,
        loading,
        ASSET_TYPES,
        setSelectedRoom,
        setAssetType,
        setDescription,
        handleSubmit,
        handleStatusChange,
        handleDelete,
        navigate
    };
};
