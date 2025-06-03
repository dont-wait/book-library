import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

interface PaymentInfoProps {
    amount: number;
    onClose: () => void;
    onSuccess: () => void;
    selectedIds: string[];
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({ amount, onClose, onSuccess }) => {
    const accountNumber = "38735929777";
    const bankCode = "970423";
    const accountName = "NGUYEN TAN SANG";
    const addInfo = "Thanh toan phieu muon";

    const qrUrl = `https://api.vietqr.io/image/${bankCode}-${accountNumber}-GgyWqJu.jpg?accountName=${encodeURIComponent(
        accountName
    )}&amount=${amount}&addInfo=${encodeURIComponent(addInfo)}`;

    const [countdown, setCountdown] = useState(60);
    const [showQR, setShowQR] = useState(true);
    const [showZoomModal, setShowZoomModal] = useState(false);

    useEffect(() => {
        if (countdown === 0) {
            setShowQR(false);
            return;
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleZoomOpen = () => {
        setShowZoomModal(true);
    };

    const handleZoomClose = () => {
        setShowZoomModal(false);
    };

    return (
        <>
            <Modal show onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Quét mã để thanh toán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ position: "relative", width: "320px", margin: "0 auto" }}>
                        {showQR ? (
                            <>
                                <img
                                    src={qrUrl}
                                    alt="QR Code"
                                    style={{ width: "320px", height: "320px", objectFit: "contain" }}
                                    className="mb-3"
                                />
                                {/* Nút + nhỏ chính giữa */}
                                <button
                                    onClick={handleZoomOpen}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: "rgba(0,0,0,0.4)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "30px",
                                        height: "30px",
                                        color: "white",
                                        fontSize: "20px",
                                        lineHeight: "30px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    aria-label="Phóng to QR code"
                                >
                                    +
                                </button>
                                <p className="text-muted mt-2 text-center">
                                    Mã sẽ hết hạn sau {countdown} giây
                                </p>
                            </>
                        ) : (
                            <p className="text-center text-danger">
                                Mã QR đã hết hạn.
                            </p>
                        )}
                    </div>
                    <p className="text-muted text-center">Dùng app ngân hàng để quét mã trên.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={onSuccess}>
                        Tôi đã thanh toán
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal phóng to */}
            <Modal show={showZoomModal} onHide={handleZoomClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>QR Code phóng to</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center">
                    <img
                        src={qrUrl}
                        alt="QR Code phóng to"
                        style={{ width: "500px", height: "500px", objectFit: "contain" }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleZoomClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaymentInfo;
