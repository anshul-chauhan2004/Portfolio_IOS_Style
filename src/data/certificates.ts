// Import certificates
import networkingFundamentals from '../assets/certificates/Networking Fundamentals.pdf';
import protectingBusinessInnovationSpecialization from '../assets/certificates/Protecting Business Innovation.pdf';
import protectingCopyright from '../assets/certificates/Protecting Business Innovations via Copyright.pdf';
import protectingPatent from '../assets/certificates/Protecting Business Innovations via Patent.pdf';
import protectingStrategy from '../assets/certificates/Protecting Business Innovations via Strategy.pdf';
import protectingTrademark from '../assets/certificates/Protecting Business Innovations via Trademark.pdf';
import interactingSystem from '../assets/certificates/Interacting with the System and Managing Memory.pdf';
import introCProgrammingHelper from '../assets/certificates/Introductory C Programming.pdf'; // Helper name to avoid conflict
import pointersArrays from '../assets/certificates/Pointers, Arrays, and Recursion.pdf';
import cloudComputingFoundations from '../assets/certificates/Cloud Computing Foundations.pdf';
import cloudDataEngineering from '../assets/certificates/Cloud Data Engineering.pdf';
import cloudVirtualization from '../assets/certificates/Cloud Virtualization, Containers and APIs.pdf';
import digitalCompetition from '../assets/certificates/Digital Competition in Financial Services.pdf';
import digitalTransformationSpecialization from '../assets/certificates/Digital Transformation in Financial Services.pdf';
import digitalTransformationCapstone from '../assets/certificates/Digital Transformation of Financial Services - Capstone Project.pdf';
import fintechTransformation from '../assets/certificates/FinTech and the Transformation in Financial Services.pdf';
import innovationStrategy from '../assets/certificates/Innovation Strategy- Developing Your Fintech strategy.pdf';
import agileScrum from '../assets/certificates/Introduction to Agile Development and Scrum.pdf';
import introCloudComputing from '../assets/certificates/Introduction to Cloud Computing.pdf';
import introDevOps from '../assets/certificates/Introduction to DevOps.pdf';
import programmingFundamentals from '../assets/certificates/Programming Fundamentals.pdf';
import writingRunningC from '../assets/certificates/Writing, Running, and Fixing Code in C.pdf';
import financeValue from '../assets/certificates/Finance For Everyone- Value.pdf';
import financeCapstone from '../assets/certificates/Finance for Everyone Capstone Project.pdf';
import financeSpecialization from '../assets/certificates/Finance for Everyone.pdf';
import financeDebt from '../assets/certificates/Finance for Everyone- Debt.pdf';
import financeDecisions from '../assets/certificates/Finance for Everyone- Decisions.pdf';
import financeMarkets from '../assets/certificates/Finance for Everyone- Markets.pdf';
import artsScienceRelationships from '../assets/certificates/The Arts and Science of Relationships- Understanding Human Needs.pdf';

export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    date: string;
    type: 'pdf' | 'image' | 'doc';
    documentUrl: string;
}

export const certificates: Certificate[] = [
    // Image 1
    { id: '1', name: 'Networking Fundamentals', issuer: 'Akamai Technologies, Inc.', date: 'Aug 2024', type: 'pdf', documentUrl: networkingFundamentals },
    { id: '2', name: 'Protecting Business Innovation Specialization', issuer: 'HKUST', date: 'Aug 2024', type: 'pdf', documentUrl: protectingBusinessInnovationSpecialization },
    { id: '3', name: 'Protecting Business Innovations via Copyright', issuer: 'HKUST', date: 'Aug 2024', type: 'pdf', documentUrl: protectingCopyright },
    { id: '4', name: 'Protecting Business Innovations via Patent', issuer: 'HKUST', date: 'Aug 2024', type: 'pdf', documentUrl: protectingPatent },
    { id: '5', name: 'Protecting Business Innovations via Strategy', issuer: 'HKUST', date: 'Aug 2024', type: 'pdf', documentUrl: protectingStrategy },
    { id: '6', name: 'Protecting Business Innovations via Trademark', issuer: 'HKUST', date: 'Aug 2024', type: 'pdf', documentUrl: protectingTrademark },
    { id: '7', name: 'Interacting with the System and Managing Memory', issuer: 'Duke University', date: 'Mar 2024', type: 'pdf', documentUrl: interactingSystem },
    { id: '8', name: 'Introductory C Programming Specialization', issuer: 'Duke University', date: 'Mar 2024', type: 'pdf', documentUrl: introCProgrammingHelper },
    { id: '9', name: 'Pointers, Arrays, and Recursion', issuer: 'Duke University', date: 'Mar 2024', type: 'pdf', documentUrl: pointersArrays },
    { id: '10', name: 'Cloud Computing Foundations', issuer: 'Duke University', date: 'Feb 2024', type: 'pdf', documentUrl: cloudComputingFoundations },
    { id: '11', name: 'Cloud Data Engineering', issuer: 'Duke University', date: 'Feb 2024', type: 'pdf', documentUrl: cloudDataEngineering },
    { id: '12', name: 'Cloud Virtualization, Containers and APIs', issuer: 'Duke University', date: 'Feb 2024', type: 'pdf', documentUrl: cloudVirtualization },
    { id: '13', name: 'Digital Competition in Financial Services', issuer: 'Copenhagen Business School', date: 'Feb 2024', type: 'pdf', documentUrl: digitalCompetition },
    { id: '14', name: 'Digital Transformation in Financial Services Specialization', issuer: 'Copenhagen Business School', date: 'Feb 2024', type: 'pdf', documentUrl: digitalTransformationSpecialization },
    { id: '15', name: 'Digital Transformation of Financial Services - Capstone Project', issuer: 'Copenhagen Business School', date: 'Feb 2024', type: 'pdf', documentUrl: digitalTransformationCapstone },
    { id: '16', name: 'FinTech and the Transformation in Financial Services', issuer: 'Copenhagen Business School', date: 'Feb 2024', type: 'pdf', documentUrl: fintechTransformation },
    { id: '17', name: 'Innovation Strategy: Developing Your Fintech strategy', issuer: 'Copenhagen Business School', date: 'Feb 2024', type: 'pdf', documentUrl: innovationStrategy },
    { id: '18', name: 'Introduction to Agile Development and Scrum', issuer: 'IBM', date: 'Feb 2024', type: 'pdf', documentUrl: agileScrum },
    { id: '19', name: 'Introduction to Cloud Computing', issuer: 'IBM', date: 'Feb 2024', type: 'pdf', documentUrl: introCloudComputing },

    // Image 2
    { id: '20', name: 'Introduction to DevOps', issuer: 'IBM', date: 'Feb 2024', type: 'pdf', documentUrl: introDevOps },
    { id: '21', name: 'Programming Fundamentals', issuer: 'Duke University', date: 'Feb 2024', type: 'pdf', documentUrl: programmingFundamentals },
    { id: '22', name: 'Writing, Running, and Fixing Code in C', issuer: 'Duke University', date: 'Feb 2024', type: 'pdf', documentUrl: writingRunningC },
    { id: '23', name: 'Finance For Everyone: Value', issuer: 'McMaster University', date: 'Oct 2023', type: 'pdf', documentUrl: financeValue },
    { id: '24', name: 'Finance for Everyone Capstone Project', issuer: 'McMaster University', date: 'Oct 2023', type: 'pdf', documentUrl: financeCapstone },
    { id: '25', name: 'Finance for Everyone Specialization', issuer: 'McMaster University', date: 'Oct 2023', type: 'pdf', documentUrl: financeSpecialization },
    { id: '26', name: 'Finance for Everyone: Debt', issuer: 'McMaster University', date: 'Oct 2023', type: 'pdf', documentUrl: financeDebt },
    { id: '27', name: 'Finance for Everyone: Decisions', issuer: 'McMaster University', date: 'Oct 2023', type: 'pdf', documentUrl: financeDecisions },
    { id: '28', name: 'Finance for Everyone: Markets', issuer: 'McMaster University', date: 'Oct 2023', type: 'pdf', documentUrl: financeMarkets },
    { id: '29', name: 'The Arts and Science of Relationships: Understanding Human Needs', issuer: 'University of Toronto', date: 'Oct 2023', type: 'pdf', documentUrl: artsScienceRelationships },
];
