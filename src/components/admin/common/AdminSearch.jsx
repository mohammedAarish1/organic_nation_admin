import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const AdminSearch = ({
    data = [],
    title = '',
    setSortedOrders,
    setCurrentPage,
    sortDirection
}) => {

    const [searchTerm, setSearchTerm] = useState('');

    const sortAndFilterOrders = () => {
        let filtered = data ? [...data] : [];

        // Filter orders based on search term
        if (searchTerm) {
            if (title === 'Orders') {
                filtered = filtered.filter(order =>
                    order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.phoneNumber.includes(searchTerm) ||
                    order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    order.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (title === 'Users') {
                filtered = filtered.filter(user =>
                    user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (title === 'Queries') {
                filtered = filtered.filter(query =>
                    query.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    query.email.includes(searchTerm) ||
                    query.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    query.city.toLowerCase().includes(searchTerm.toLowerCase())
                );
            } else if (title === 'Products') {
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.weight.includes(searchTerm.toLowerCase())
                    // product.tax.includes(searchTerm) ||
                    // product.price.includes(searchTerm)
                );
            }else if (title==='Returns'){
                filtered = filtered.filter(returned =>
                    returned.itemName.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

        }

        // Sort filtered orders
        const sorted = filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setSortedOrders(sorted);
        setCurrentPage(1); // Reset to first page when search changes
    };


    useEffect(() => {
        sortAndFilterOrders();
    }, [data, sortDirection, searchTerm]);

    if (title === 'Banners') {
        return (
            <></>
        )
    }

    return (

        <div className="relative mr-4">
            <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-2 py-1 border rounded"
            />
            <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
    )
}

export default AdminSearch
