import { useRouter } from "next/navigation";
import CheckCircle from "../../app/icons/CheckCircle";
import Clock from "../../app/icons/Clock";
import EyeIcon from "../../app/icons/EyeIcon";
import MailIcon from "../../app/icons/MailIcon";
import PencilIcon from "../../app/icons/PencilIcon";
import Button from "../ui/Button";

const PatientCard = ({name, age, gender, email, id}: {name: string; age: number; gender: string; email: string; id: string}) => {


  const router = useRouter();

  const getStatusColor = (status: "active" | "inactive")  => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-600 border-gray-500';
    }
    };

    const getStatusIcon = (status: "active" | "inactive") => {
    switch (status) {
      case 'active':
        return <div className="text-green-500"><CheckCircle /></div>;
      case 'inactive':
        return <div className="text-gray-400"><Clock /></div>;
    }
  };

  return (
    <div className="bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border  overflow-hidden p-6">
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                <p className="text-sm text-gray-400">{age} years • {gender}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full  text-xs font-medium border ${getStatusColor("active")}`}>
                    {getStatusIcon("active")}
                    <span>{"active"}</span>
                </span>
            </div>
        </div>
        <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-green-500">
                <MailIcon />
                <span className="truncate text-gray-400">{email}</span>
            </div>
        </div>
        <div className="flex justify-start gap-4">
          <Button variant="primary" size="md" onClick={()=>{router.push(`/patient/${id}`)}} ><div className="flex gap-2"><PencilIcon /><p>Edit</p></div></Button>
        </div>
    </div>
  )
}

export default PatientCard