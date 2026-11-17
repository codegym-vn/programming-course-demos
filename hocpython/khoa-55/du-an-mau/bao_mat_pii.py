"""Ẩn danh thông tin cá nhân nhạy cảm (PII) trước khi gửi văn bản ra ngoài."""
import re


def che_pii(van_ban):
    """Che Email, SĐT Việt Nam (0/+84) và CCCD 12 chữ số mà giữ nguyên tiền tệ."""
    kq = re.sub(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        "[AN_EMAIL]",
        van_ban,
    )
    kq = re.sub(r"(?<!\d)\d{12}(?!\d)", "[AN_CCCD]", kq)
    kq = re.sub(
        r"(?<!\d)(?:\+84|0)(?:3[2-9]|5\d|7\d|8\d|9\d)\d{7}(?!\d)",
        "[AN_SDT]",
        kq,
    )
    return kq
