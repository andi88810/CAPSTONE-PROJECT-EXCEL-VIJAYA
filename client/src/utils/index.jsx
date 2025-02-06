export const generateSelectAmount = (amount) => {
    return Array.from({ length: amount }, (_, index) => {
        const amount = index + 1;
        return (
        //     <div className='flex items-center'>
        //     <button className='btn btn-primary mx-1'>-</button>
        //     <span className='text-white'>{amount}</span>
        //     <button className='btn btn-primary mx-1'>+</button>
        //   </div>
    
            <option className="flex items-center" key={amount} value={amount}>
                {amount}
            </option>
        );
    });
};
export const priceFormat = (price) => {
    const rupiahFormat = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    // Remove the last two zeros and the decimal separator
    return rupiahFormat.replace(/,00$/, '');
};
