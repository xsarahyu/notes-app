import { useState } from 'react';
const SwitcherOne = ({ user, updateUserById }) => {
    const [enabled, setEnabled] = useState((user === null || user === void 0 ? void 0 : user.hasPaid) || false);
    return (<div className='relative'>
      <label htmlFor={`toggle1-${user === null || user === void 0 ? void 0 : user.id}`} className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input type='checkbox' id={`toggle1-${user === null || user === void 0 ? void 0 : user.id}`} className='sr-only' onChange={() => {
            setEnabled(!enabled);
            updateUserById && updateUserById({ id: user === null || user === void 0 ? void 0 : user.id, data: { hasPaid: !enabled } });
        }}/>
          <div className='reblock h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]'></div>
          <div className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white dark:bg-gray-400 transition ${enabled && '!right-1 !translate-x-full !bg-primary dark:!bg-white'}`}></div>
        </div>
      </label>
    </div>);
};
export default SwitcherOne;
//# sourceMappingURL=SwitcherOne.jsx.map