from enum import Enum

class Role(Enum):
    ADMIN = 'admin'
    STUDENT = 'user_student'
    COMPANY= 'user_company'

def hasRole(role):
    if role.lower() == 'admin':
        return Role.ADMIN.value
    
    elif role.lower() == 'student':
        return Role.STUDENT.value
    
    elif role.lower() == 'company':
        return Role.COMPANY.value