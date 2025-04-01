
import React, { useState } from 'react';
import { Car, Wrench, Clock, DollarSign, Printer, Calendar } from 'lucide-react';

const ReceiptsUser = () => {

    const [currentDate] = useState(new Date().toLocaleDateString());
    const [repairItems] = useState ([
        {
            service: "Oil Change",
            parts: "Synthetic Oil + Filter",
            labor: 0.5,
            cost: 89.99
        },
        {
            service: "Brake Pad Replacement",
            parts: "Front Ceramic Brake Pads",
            labor: 1.5,
            cost: 249.99
        },
        {
            service: "Tire Rotation",
            parts: "N/A",
            labor: 0.5,
            cost: 39.99
        }
    ]);
    const subtotal = repairItems.reduce((sum, item) => sum + item.cost, 0);
    const tax = subtotal * 0.0825; // 8.25% tax
    const total = subtotal + tax;

    return (
   

  
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Wrench className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">AutoCare Pro Services</h1>
                        </div>
                        <button className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                            <Printer className="h-5 w-5" />
                            <span>Print</span>
                        </button>
                    </div>
                </div>

                {/* Receipt Content */}
                <div className="p-6 space-y-6">
                    {/* Receipt Info */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="h-5 w-5" />
                                <span>Date: {currentDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="h-5 w-5" />
                                <span>Invoice #: INV-2024-0123</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Car className="h-5 w-5" />
                                <span>Vehicle: 2020 Toyota Camry</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <span className="font-medium">Mileage: 45,230</span>
                            </div>
                        </div>
                    </div>

                    {/* Services Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parts</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labor (hrs)</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {repairItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.service}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parts}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.labor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${item.cost.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="border-t pt-4">
                        <div className="flex justify-end space-y-2">
                            <div className="w-64 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax (8.25%):</span>
                                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span className="flex items-center">
                                        <DollarSign className="h-5 w-5 mr-1" />
                                        Total:
                                    </span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t pt-6 text-center text-gray-500 text-sm">
                        <p>Thank you for choosing AutoCare Pro Services!</p>
                        <p>For questions about this receipt, please contact us at (555) 123-4567</p>
                        <p>123 Auto Service Lane, Cartown, ST 12345</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiptsUser;