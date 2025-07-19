// Core Domain Types - Aligned with Microservices Architecture

// User Domain Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  DONOR = 'DONOR',
  CAMPAIGN_CREATOR = 'CAMPAIGN_CREATOR',
  COMMUNITY_LEADER = 'COMMUNITY_LEADER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION'
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  address?: Address;
  bio?: string;
  interests: string[];
  // Accessibility preferences
  accessibilitySettings: AccessibilitySettings;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlindnessType?: ColorBlindnessType;
}

export enum ColorBlindnessType {
  PROTANOPIA = 'PROTANOPIA',
  DEUTERANOPIA = 'DEUTERANOPIA',
  TRITANOPIA = 'TRITANOPIA',
  ACHROMATOPSIA = 'ACHROMATOPSIA'
}

export interface UserPreferences {
  language: string;
  timezone: string;
  currency: string;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  marketing: boolean;
  campaignUpdates: boolean;
  communityActivity: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'PUBLIC' | 'PRIVATE' | 'COMMUNITY';
  showDonationHistory: boolean;
  showLocation: boolean;
  allowMessaging: boolean;
  dataProcessingConsent: boolean;
}

// Campaign Domain Types
export interface Campaign {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  slug: string;
  category: CampaignCategory;
  status: CampaignStatus;
  creator: User;
  beneficiary: Beneficiary;
  target: CampaignTarget;
  progress: CampaignProgress;
  timeline: CampaignTimeline;
  media: CampaignMedia[];
  location: Address;
  tags: string[];
  verification: CampaignVerification;
  transparency: TransparencyReport[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignTarget {
  amount: Money;
  deadline: Date;
  minimumDonation?: Money;
  maximumDonation?: Money;
}

export interface CampaignProgress {
  raised: Money;
  percentage: number;
  donorCount: number;
  lastDonation?: Date;
  milestones: CampaignMilestone[];
}

export interface CampaignMilestone {
  id: string;
  title: string;
  description: string;
  targetAmount: Money;
  achievedAt?: Date;
  isCompleted: boolean;
}

export interface CampaignTimeline {
  startDate: Date;
  endDate: Date;
  milestones: TimelineMilestone[];
}

export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
}

export interface CampaignMedia {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  altText: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface CampaignVerification {
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: Date;
  documents: VerificationDocument[];
  notes?: string;
}

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  uploadedAt: Date;
}

export interface TransparencyReport {
  id: string;
  title: string;
  description: string;
  amount: Money;
  receipts: MediaFile[];
  reportDate: Date;
  approvedBy?: string;
}

export enum CampaignCategory {
  EDUCATION = 'EDUCATION',
  HEALTH = 'HEALTH',
  DISASTER_RELIEF = 'DISASTER_RELIEF',
  COMMUNITY_DEVELOPMENT = 'COMMUNITY_DEVELOPMENT',
  ENVIRONMENT = 'ENVIRONMENT',
  ORPHANAGE = 'ORPHANAGE',
  ELDERLY_CARE = 'ELDERLY_CARE',
  DISABILITY_SUPPORT = 'DISABILITY_SUPPORT'
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED'
}

export interface Beneficiary {
  type: BeneficiaryType;
  name: string;
  description: string;
  contact?: ContactInfo;
  verification: BeneficiaryVerification;
}

export interface BeneficiaryVerification {
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: Date;
  documents: VerificationDocument[];
  legalDocuments?: LegalDocument[];
}

export interface LegalDocument {
  id: string;
  type: 'REGISTRATION_CERTIFICATE' | 'TAX_ID' | 'BANK_ACCOUNT' | 'OTHER';
  name: string;
  url: string;
  expiryDate?: Date;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
}

export enum BeneficiaryType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
  COMMUNITY = 'COMMUNITY'
}

// Payment Domain Types
export interface Payment {
  id: string;
  campaignId: string;
  donorId: string;
  amount: Money;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  gateway: PaymentGateway;
  fees: PaymentFees;
  metadata: PaymentMetadata;
  createdAt: Date;
  processedAt?: Date;
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: 'BANK' | 'E_WALLET' | 'CRYPTO' | 'CARD_PROCESSOR';
  fees: GatewayFees;
  isActive: boolean;
}

export interface PaymentFees {
  platformFee: Money;
  gatewayFee: Money;
  totalFees: Money;
  netAmount: Money;
}

export interface PaymentMetadata {
  transactionId?: string;
  gatewayTransactionId?: string;
  bankCode?: string;
  cardLast4?: string;
  userAgent?: string;
  ipAddress?: string;
  fraudScore?: number;
}

export interface GatewayFees {
  percentage: number;
  fixedAmount: Money;
  minimumFee: Money;
  maximumFee?: Money;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  E_WALLET = 'E_WALLET',
  CRYPTO = 'CRYPTO',
  QRIS = 'QRIS'
}

export interface Money {
  amount: number;
  currency: string;
  formatted: string;
}

// Community Domain Types
export interface CommunityPost {
  id: string;
  authorId: string;
  campaignId?: string;
  content: string;
  media: MediaFile[];
  tags: string[];
  interactions: PostInteractions;
  visibility: PostVisibility;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostInteractions {
  likes: number;
  comments: number;
  shares: number;
  reactions: Reaction[];
}

export interface Reaction {
  id: string;
  userId: string;
  type: ReactionType;
  createdAt: Date;
}

export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  SUPPORT = 'SUPPORT',
  PRAY = 'PRAY',
  THANK = 'THANK',
  HOPE = 'HOPE'
}

export enum PostVisibility {
  PUBLIC = 'PUBLIC',
  COMMUNITY = 'COMMUNITY',
  PRIVATE = 'PRIVATE'
}

// Notification Domain Types
export interface Notification {
  id: string;
  recipientId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  status: NotificationStatus;
  priority: NotificationPriority;
  channels: NotificationChannel[];
  createdAt: Date;
  readAt?: Date;
}

export enum NotificationType {
  CAMPAIGN_UPDATE = 'CAMPAIGN_UPDATE',
  DONATION_RECEIVED = 'DONATION_RECEIVED',
  CAMPAIGN_COMPLETED = 'CAMPAIGN_COMPLETED',
  COMMUNITY_POST = 'COMMUNITY_POST',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  SECURITY_ALERT = 'SECURITY_ALERT'
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum NotificationChannel {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  WHATSAPP = 'WHATSAPP'
}

// Shared Common Types
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: SocialMediaLinks;
}

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface MediaFile {
  id: string;
  url: string;
  thumbnailUrl?: string;
  type: MediaType;
  size: number;
  dimensions?: MediaDimensions;
  altText: string; // Required for accessibility
  caption?: string;
  createdAt: Date;
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT'
}

export interface MediaDimensions {
  width: number;
  height: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

export interface ResponseMeta {
  pagination?: PaginationMeta;
  timestamp: string;
  requestId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Performance & Analytics Types
export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
  tti: number; // Time to Interactive
}

export interface AccessibilityAudit {
  score: number;
  violations: AccessibilityViolation[];
  timestamp: Date;
  url: string;
}

export interface AccessibilityViolation {
  id: string;
  description: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  nodes: AccessibilityNode[];
}

export interface AccessibilityNode {
  html: string;
  selector: string;
  failureSummary: string;
}

// Form & Validation Types
export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  validation?: ValidationRule[];
  accessibility?: FieldAccessibility;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface FieldAccessibility {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  helpText?: string;
  errorText?: string;
}

// Export main types - additional domain files can be added later
// export * from './auth';
// export * from './campaign';
// export * from './payment';
// export * from './community';
// export * from './notification';
