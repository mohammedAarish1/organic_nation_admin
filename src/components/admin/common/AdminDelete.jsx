import { Trash } from 'lucide-react';

const AdminDelete = ({handleDelete}) => {
    return (
        <div>
            <button
                onClick={handleDelete}
                className=" text-red-500 py-1 rounded hover:text-red-700"
            >
                <Trash size={20} className="text-xl" />
            </button>
        </div>
    )
}

export default AdminDelete;
