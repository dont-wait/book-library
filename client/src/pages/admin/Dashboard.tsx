import { Tab } from '@headlessui/react';
import BookManagement from '../../components/admin/BookManagement';
import CategoryManagement from '../../components/admin/CategoryManagement';
import AuthorManagement from '../../components/admin/AuthorManagement';
import UserManagement from '../../components/admin/UserManagement';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard = () => {
  const tabs = [
    { name: 'Books', component: BookManagement },
    { name: 'Categories', component: CategoryManagement },
    { name: 'Authors', component: AuthorManagement },
    { name: 'Users', component: UserManagement },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-t-xl bg-gray-100 p-1">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }: { selected: boolean }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                    )
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {tabs.map((tab, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  <tab.component />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 