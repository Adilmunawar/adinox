
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Edit, QrCode, MoreVertical, Trash2, AlertCircle, Check, ShieldCheck } from "lucide-react";
import { TokenType } from "@/context/TokenContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { formatTOTPDisplay, getTimeRemaining } from "@/utils/tokenUtils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { GlowPulse, ScaleIn } from "@/components/ui/animations";

interface TokenCardProps {
  token: TokenType;
  onRemove: (id: string) => void;
  onEdit?: (token: TokenType) => void;
}

const TokenCard = ({ token, onRemove, onEdit }: TokenCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(token.period));
  const [progress, setProgress] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(token.period);
      setTimeRemaining(remaining);
      
      // Calculate progress percentage for the timer
      const progressValue = (remaining / token.period) * 100;
      setProgress(progressValue);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [token.period]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(token.currentCode);
    setCopied(true);
    
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard.",
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove the token for ${token.issuer || token.name}?`)) {
      onRemove(token.id);
    }
  };

  const getTimerColor = () => {
    if (timeRemaining <= 5) return "text-destructive";
    if (timeRemaining <= 10) return "text-amber-500";
    return "text-primary";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }
  };

  const animatedDigits = (code: string) => {
    return formatTOTPDisplay(code).split('').map((digit, index) => (
      <motion.span 
        key={index} 
        className="inline-block transform transition-all duration-300 hover:scale-110 hover:text-primary"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {digit}
      </motion.span>
    ));
  };

  const progressVariants = {
    initial: { width: "100%" },
    animate: { width: `${progress}%` }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
        layoutId={`token-card-${token.id}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className={cn(
          "token-card backdrop-blur-md border-l-4",
          "p-4 relative overflow-hidden",
          timeRemaining <= 5 ? "border-l-destructive" : "border-l-primary",
          isHovered ? "bg-card/95" : "bg-card/90"
        )}>
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 -z-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          <div className="flex justify-between items-start mb-2">
            <div className="max-w-[70%]">
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mr-2"
                >
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-lg line-clamp-1 group flex items-center">
                  {token.issuer}
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    className="ml-2 text-xs bg-primary/20 text-primary px-1 py-0.5 rounded"
                  >
                    {token.algorithm}
                  </motion.span>
                </h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 ml-7">{token.name}</p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-primary/20">
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                    <MoreVertical className="h-4 w-4" />
                  </motion.div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-50 w-56 animate-in slide-in-from-top-5 fade-in-20">
                <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
                  <Copy className="h-4 w-4 mr-2" /> Copy Code
                </DropdownMenuItem>
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(token)} className="cursor-pointer">
                    <Edit className="h-4 w-4 mr-2" /> Edit Token
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleShowQR} className="cursor-pointer">
                  <QrCode className="h-4 w-4 mr-2" /> Show QR Code
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive cursor-pointer" 
                  onClick={handleRemove}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className={`mt-6 p-3 bg-background/50 backdrop-blur-sm rounded-lg flex ${isMobile ? 'flex-col gap-2' : 'justify-between items-center'} animated-border`}>
            <div className="token-code text-2xl font-mono font-bold select-all flex animated-border-content">
              {animatedDigits(token.currentCode)}
            </div>
            <Button 
              variant={copied ? "secondary" : "outline"} 
              size="sm" 
              className={cn(
                "flex gap-1 items-center transition-all duration-300",
                copied ? "bg-green-600 text-white hover:bg-green-700" : "",
                "btn-shine"
              )}
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {!isMobile && <span>Copy</span>}
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-4 relative">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-muted-foreground">Refreshes in</span>
              <motion.span 
                className={`text-sm font-medium ${getTimerColor()} transition-colors duration-300`}
                animate={timeRemaining <= 5 ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ 
                  duration: 0.5, 
                  repeat: timeRemaining <= 5 ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {timeRemaining}s
              </motion.span>
            </div>
            <div className="relative h-2 bg-muted/40 rounded-full overflow-hidden">
              <motion.div 
                className={cn(
                  "absolute h-full left-0 rounded-full",
                  timeRemaining <= 5 ? "bg-destructive" : 
                  timeRemaining <= 10 ? "bg-amber-500" : "bg-primary"
                )}
                variants={progressVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
            <AnimatePresence>
              {timeRemaining <= 5 && (
                <motion.div 
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <GlowPulse color="rgba(239, 68, 68, 0.5)" className="rounded-full">
                    <div className="text-destructive flex items-center gap-1 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>Expiring soon</span>
                    </div>
                  </GlowPulse>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
      
      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-center">Token QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <ScaleIn className="bg-white p-4 rounded-lg shadow-inner">
              <div className="w-48 h-48 flex items-center justify-center bg-muted text-center p-4 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    background: ["linear-gradient(45deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.2) 50%, rgba(124,58,237,0.1) 100%)"],
                    rotate: [0, 360] 
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-primary/20 via-primary/40 to-primary/20" />
                </motion.div>
                <div className="relative z-10 glass-morphism rounded-lg">
                  <p className="text-sm text-muted-foreground bg-white/80 p-2 rounded backdrop-blur-sm">
                    For security reasons, the original QR code cannot be regenerated without the original secret.
                  </p>
                </div>
              </div>
            </ScaleIn>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <p className="text-sm text-center">
                <span className="font-semibold">{token.issuer}</span> ({token.name})
              </p>
              <p className="mt-1 text-xs text-center text-muted-foreground">
                Type: TOTP | Algorithm: {token.algorithm} | Digits: {token.digits}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowQR(false)} 
                className="mt-4 w-full btn-shine"
              >
                Close
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TokenCard;
