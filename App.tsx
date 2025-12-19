
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { UploadSection } from './components/UploadSection';
import { RedeemSection } from './components/RedeemSection';
import { AIGenSection } from './components/AIGenSection';
import { FeedSection } from './components/FeedSection';
import { UserSwitcher } from './components/UserSwitcher';
import { Tab, UserStats, HistoryItem, PhotoEntry, UserAccount } from './types';

const REWARD_PER_UPLOAD = 2;
const REWARD_PER_LIKE = 2;

/**
 * UPDATED ENGAGEMENT LOGIC:
 * User Request: Each photo should get 5 to 10 likes per day.
 * Calculation: 
 * Likes per photo: 5 - 10
 * Earning per photo (from likes): 5 * ₹2 to 10 * ₹2 = ₹10 - ₹20 per day.
 * Total Daily for 5 photos: ₹50 - ₹100.
 */

const INITIAL_ACCOUNTS: UserAccount[] = [
  {
    id: 'u1',
    username: 'Santosh7988',
    avatarColor: 'bg-sky-500',
    photos: [],
    history: [],
    totalData: 10.5,
    withdrawalsTotal: 0
  },
  {
    id: 'u2',
    username: 'Santosh8688',
    avatarColor: 'bg-indigo-500',
    photos: [],
    history: [],
    totalData: 5.2,
    withdrawalsTotal: 0
  },
  {
    id: 'u3',
    username: 'akastrickster8777',
    avatarColor: 'bg-emerald-500',
    photos: [],
    history: [],
    totalData: 8.0,
    withdrawalsTotal: 0
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [accounts, setAccounts] = useState<UserAccount[]>(INITIAL_ACCOUNTS);
  const [activeAccountId, setActiveAccountId] = useState<string>(INITIAL_ACCOUNTS[0].id);

  const activeAccount = useMemo(() => 
    accounts.find(a => a.id === activeAccountId) || accounts[0], 
  [accounts, activeAccountId]);

  // Dynamic stats for the ACTIVE account
  const stats = useMemo(() => {
    const totalLikes = activeAccount.photos.reduce((acc, photo) => acc + photo.likes, 0);
    const totalUploadEarnings = activeAccount.photos.length * REWARD_PER_UPLOAD;
    const totalLikeEarnings = totalLikes * REWARD_PER_LIKE;
    const balance = Math.max(0, totalUploadEarnings + totalLikeEarnings - activeAccount.withdrawalsTotal);

    return {
      balance,
      totalData: activeAccount.totalData,
      photosUploaded: activeAccount.photos.length,
      totalLikes,
      totalLikeEarnings
    };
  }, [activeAccount]);

  // Social engagement simulation:
  // Targeting 5-10 likes per photo "daily". 
  // We simulate this by adding 1-2 likes occasionally to show growth.
  useEffect(() => {
    const interval = setInterval(() => {
      setAccounts(prevAccounts => 
        prevAccounts.map(acc => ({
          ...acc,
          photos: acc.photos.map(photo => {
            const growthChance = Math.random();
            let addedLikes = 0;
            // Higher probability and more likes to match the "5-10 per day" feel in a faster demo loop
            if (growthChance > 0.3) {
              addedLikes = Math.floor(Math.random() * 2) + 1; 
            }
            return {
              ...photo,
              views: photo.views + Math.floor(Math.random() * 15) + 5,
              likes: photo.likes + addedLikes,
              shares: photo.shares + (Math.random() > 0.85 ? 1 : 0),
              comments: photo.comments + (Math.random() > 0.9 ? 1 : 0),
            };
          })
        }))
      );
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  const addHistoryToActive = (item: Omit<HistoryItem, 'id' | 'timestamp' | 'status'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: 'completed'
    };
    setAccounts(prev => prev.map(acc => 
      acc.id === activeAccountId 
        ? { ...acc, history: [newItem, ...acc.history] }
        : acc
    ));
  };

  const handleUploadComplete = (reward: number, feedback: string, imageUrl: string) => {
    const newPhoto: PhotoEntry = {
      id: Math.random().toString(36).substr(2, 9),
      url: imageUrl,
      timestamp: Date.now(),
      likes: 0,
      views: 0,
      shares: 0,
      comments: 0,
      feedback: feedback,
      isVisible: true
    };
    
    setAccounts(prev => prev.map(acc => 
      acc.id === activeAccountId 
        ? { ...acc, photos: [newPhoto, ...acc.photos] }
        : acc
    ));
    addHistoryToActive({ type: 'upload', amount: REWARD_PER_UPLOAD, unit: '₹' });
  };

  const handleDeletePhoto = (photoId: string) => {
    if (confirm("Asset ko Feed se hide karein? Aapki kamai safe rahegi.")) {
      setAccounts(prev => prev.map(acc => 
        acc.id === activeAccountId 
          ? { 
              ...acc, 
              photos: acc.photos.map(p => p.id === photoId ? { ...p, isVisible: false } : p) 
            }
          : acc
      ));
    }
  };

  const handleWithdraw = (amount: number, method: string) => {
    if (stats.balance >= amount) {
      setAccounts(prev => prev.map(acc => 
        acc.id === activeAccountId 
          ? { ...acc, withdrawalsTotal: acc.withdrawalsTotal + amount }
          : acc
      ));
      addHistoryToActive({ type: 'withdraw', amount: amount, unit: '₹', method });
      return true;
    }
    return false;
  };

  const handleRedeem = (dataAmount: string) => {
    const gb = parseFloat(dataAmount.replace(/[^\d.]/g, ''));
    const val = isNaN(gb) ? 0 : gb;
    setAccounts(prev => prev.map(acc => 
      acc.id === activeAccountId 
        ? { ...acc, totalData: acc.totalData + val }
        : acc
    ));
    addHistoryToActive({ type: 'redeem', amount: val, unit: 'GB' });
  };

  const visiblePhotos = useMemo(() => 
    activeAccount.photos.filter(p => p.isVisible !== false),
  [activeAccount.photos]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <UserSwitcher 
          accounts={accounts} 
          activeAccountId={activeAccountId} 
          onSwitch={setActiveAccountId} 
        />
        
        {activeTab === Tab.Dashboard && (
          <Dashboard 
            stats={stats} 
            history={activeAccount.history} 
            onStartUpload={() => setActiveTab(Tab.Upload)}
            onWithdraw={handleWithdraw}
          />
        )}
        {activeTab === Tab.Upload && (
          <UploadSection onUploadComplete={handleUploadComplete} />
        )}
        {activeTab === Tab.Feed && (
          <FeedSection photos={visiblePhotos} onDeletePhoto={handleDeletePhoto} />
        )}
        {activeTab === Tab.Redeem && (
          <RedeemSection onRedeemSuccess={handleRedeem} />
        )}
        {activeTab === Tab.AIGen && (
          <AIGenSection />
        )}
      </div>
    </Layout>
  );
};

export default App;
