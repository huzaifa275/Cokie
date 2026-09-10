import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Flame, 
  PackageCheck, 
  Bike, 
  Store, 
  Phone, 
  Sparkles,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate progress over time
  useEffect(() => {
    if (!order) return;
    const t1 = setTimeout(() => setCurrentStep(2), 3000);
    const t2 = setTimeout(() => setCurrentStep(3), 8000);
    const t3 = setTimeout(() => setCurrentStep(4), 16000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [order]);

  if (!isOpen || !order) return null;

  const steps = [
    { num: 1, title: 'Order Received', desc: 'Sent to Head Baker', icon: CheckCircle2 },
    { num: 2, title: 'Baking in Oven', desc: 'Melted Belgian chocolate aroma', icon: Flame },
    { num: 3, title: 'Quality & Box Packaging', desc: 'Sealed with bakery ribbon', icon: PackageCheck },
    { num: 4, title: order.orderType === 'delivery' ? 'Rider On The Way' : 'Ready for Counter Pickup', desc: order.orderType === 'delivery' ? 'Speeding to your doorstep' : 'Hot & ready at counter', icon: order.orderType === 'delivery' ? Bike : Store },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#23120b] border border-[#522917] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1a0c06] px-6 py-4 border-b border-[#3b1c10] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#22c55e]/20 text-[#22c55e] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-display font-black text-white">Live Bakery Tracker</h2>
                <span className="bg-[#e07a3f] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  #{order.orderNumber}
                </span>
              </div>
              <p className="text-xs text-[#b89582]">Placed at {order.placedAt} • Estimated time: {order.estimatedTime}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#b38e7b] hover:text-white hover:bg-[#341a0f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Status Highlight Banner */}
          <div className="bg-gradient-to-r from-[#3e1d10] via-[#522413] to-[#3e1d10] p-4 rounded-2xl border border-[#6b351e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e07a3f] text-white flex items-center justify-center animate-pulse">
                {currentStep === 1 && <Clock className="w-5 h-5" />}
                {currentStep === 2 && <Flame className="w-5 h-5" />}
                {currentStep === 3 && <PackageCheck className="w-5 h-5" />}
                {currentStep === 4 && <Bike className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  {currentStep === 1 && 'Order Confirmed by Bakery'}
                  {currentStep === 2 && 'Fresh Batch Baking in the Oven!'}
                  {currentStep === 3 && 'Inspection & Luxury Packaging'}
                  {currentStep === 4 && (order.orderType === 'delivery' ? 'Rider En Route to Your Address' : 'Ready for Store Pickup!')}
                </h3>
                <span className="text-xs text-[#f8d7c4]">
                  {currentStep === 4 ? 'Estimated arrival: 10-15 mins' : 'Piping hot goodness guaranteed'}
                </span>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-xs text-[#f7a268] font-black">
                {currentStep}/4 Steps
              </span>
            </div>
          </div>

          {/* Step Timeline */}
          <div className="bg-[#1a0b05] p-5 rounded-2xl border border-[#3b1c10] space-y-5">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.num < currentStep;
              const isCurrent = step.num === currentStep;
              const isPending = step.num > currentStep;

              return (
                <div key={step.num} className="flex items-start gap-4 relative">
                  {step.num !== 4 && (
                    <div
                      className={`absolute left-4 top-8 bottom-0 w-0.5 -mb-5 ${
                        isCompleted ? 'bg-[#22c55e]' : 'bg-[#3b1d12]'
                      }`}
                    />
                  )}

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                      isCompleted
                        ? 'bg-[#22c55e] text-black font-bold'
                        : isCurrent
                        ? 'bg-[#e07a3f] text-white ring-4 ring-[#e07a3f]/30 animate-pulse'
                        : 'bg-[#2d140a] text-[#735140]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs sm:text-sm font-bold ${isCurrent ? 'text-white' : isCompleted ? 'text-[#f7a268]' : 'text-[#735140]'}`}>
                        {step.title}
                      </h4>
                      {isCompleted && <span className="text-[10px] text-[#22c55e] font-bold">Done</span>}
                      {isCurrent && <span className="text-[10px] text-[#e07a3f] font-bold animate-pulse">In Progress</span>}
                    </div>
                    <p className="text-xs text-[#a8826e] mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rider / Branch Contact Card */}
          {order.orderType === 'delivery' && order.riderName && (
            <div className="bg-[#2a140d] p-4 rounded-2xl border border-[#4a2416] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#180b06] border border-[#e07a3f] flex items-center justify-center text-[#e07a3f]">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{order.riderName}</h4>
                  <span className="text-[11px] text-[#c9a794]">Bakery Express Delivery</span>
                </div>
              </div>

              <a
                href={`tel:${order.riderPhone}`}
                className="bg-[#3b1d11] hover:bg-[#502616] text-[#f7a268] border border-[#e07a3f]/50 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Rider</span>
              </a>
            </div>
          )}

          {/* Order Details Accordion / Summary */}
          <div className="bg-[#1b0b05] p-4 rounded-2xl border border-[#3b1c10] space-y-2.5">
            <span className="text-xs uppercase font-bold text-[#e07a3f] tracking-wider block">
              Items in this Batch ({order.items.length})
            </span>

            <div className="space-y-2">
              {order.items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="flex items-center justify-between text-xs text-[#d6b7a5]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-[#2e150c] text-white flex items-center justify-center font-bold text-[10px]">
                      {cartItem.quantity}x
                    </span>
                    <span>{cartItem.item.name}</span>
                  </div>
                  <span className="font-semibold text-white">
                    Rs. {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#361a0f] flex justify-between text-xs font-bold text-white">
              <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
              <span className="text-[#f7a268]">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Direct WhatsApp Support */}
          <div className="text-center">
            <a
              href={`https://wa.me/923001234567?text=Hi,%20I%20need%20assistance%20with%20my%20Order%20%23${order.orderNumber}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Need help or want to modify your order? WhatsApp Support</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
