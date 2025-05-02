"use client";

import { useState } from "react";
import { Wallet, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white">
            <Wallet className="w-8 h-8 text-[#dd7109]" />
            <span className="text-2xl font-bold">SecureAcompteTravaux</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">Bon retour!</h2>
            <p className="text-gray-400">
              Connectez-vous à votre compte pour continuer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-5 pl-12 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#dd7109] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#dd7109] focus:ring-[#dd7109] focus:ring-offset-0"
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Se souvenir de moi
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-[#dd7109] hover:text-[#dd7109]/90 transition-colors"
              >
                Mot de passe oublié?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#dd7109] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#dd7109]/90 transition-colors flex items-center justify-center gap-2 group"
            >
              Se connecter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-gray-400">
              Pas encore de compte?{" "}
              <Link
                href="/auth/register"
                className="text-[#dd7109] hover:text-[#dd7109]/90 transition-colors"
              >
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#dd7109]/20 to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
          alt="Office interior"
          fill
          className="object-cover"
          priority
        />
        {/* Floating Card */}
        <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 z-20 animate-float">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#dd7109] flex items-center justify-center flex-shrink-0">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Sécurisez vos acomptes
              </h3>
              <p className="text-white/80">
                Rejoignez plus de 4000 entreprises qui font confiance à notre
                solution pour la gestion de leurs acomptes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}